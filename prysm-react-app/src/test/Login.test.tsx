// Login.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

// Mocks
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockLoginUser = vi.fn();
vi.mock('../context/useAuth', () => ({
  useAuth: () => ({ loginUser: mockLoginUser }),
}));

vi.mock('../api/auth', () => ({
  login: vi.fn(),
}));

import { login as submitLogin } from '../api/auth';
const mockSubmitLogin = vi.mocked(submitLogin);

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- Initial render ---

  it('renders username, password inputs and login button', () => {
    render(<Login />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  it('password input is hidden by default', () => {
    render(<Login />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('show/hide toggle reveals and hides password', async () => {
    render(<Login />);
    const toggle = screen.getByRole('button', { name: 'Show' });

    await userEvent.click(toggle);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Hide' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Hide' }));
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  // --- Validation ---

  it('shows error when submitting empty username', async () => {
    render(<Login />);
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Username is required!')).toBeInTheDocument();
  });

  it('shows error when submitting empty password', async () => {
    render(<Login />);
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Password is required!')).toBeInTheDocument();
  });

  it('shows both errors when both fields are empty', async () => {
    render(<Login />);
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Username is required!')).toBeInTheDocument();
    expect(screen.getByText('Password is required!')).toBeInTheDocument();
  });

  it('does not call API when validation fails', async () => {
    render(<Login />);
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(mockSubmitLogin).not.toHaveBeenCalled();
  });

  it('clears username error when user starts typing', async () => {
    render(<Login />);
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Username is required!')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Username'), 'mark');
    expect(screen.queryByText('Username is required!')).not.toBeInTheDocument();
  });

  it('clears password error when user starts typing', async () => {
    render(<Login />);
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Password is required!')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Password'), 'pass');
    expect(screen.queryByText('Password is required!')).not.toBeInTheDocument();
  });

  // --- Successful login ---

  it('calls login API with correct credentials', async () => {
    mockSubmitLogin.mockResolvedValue("");
    render(<Login />);

    await userEvent.type(screen.getByLabelText('Username'), 'mark');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

    expect(mockSubmitLogin).toHaveBeenCalledWith({
      username: 'mark',
      password: 'password123',
    });
  });

  it('calls loginUser and navigates to / on success', async () => {
    mockSubmitLogin.mockResolvedValue("");
    render(<Login />);

    await userEvent.type(screen.getByLabelText('Username'), 'mark');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  // --- Error handling ---

  it('shows server error on failed login', async () => {
    mockSubmitLogin.mockRejectedValue(new Error('401'));
    render(<Login />);

    await userEvent.type(screen.getByLabelText('Username'), 'mark');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpassword');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });

  it('clears server error when user edits username', async () => {
    mockSubmitLogin.mockRejectedValue(new Error('401'));
    render(<Login />);

    await userEvent.type(screen.getByLabelText('Username'), 'mark');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpassword');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    await waitFor(() => screen.getByText('Invalid username or password'));

    await userEvent.type(screen.getByLabelText('Username'), 'x');
    expect(screen.queryByText('Invalid username or password')).not.toBeInTheDocument();
  });

  it('clears server error when user edits password', async () => {
    mockSubmitLogin.mockRejectedValue(new Error('401'));
    render(<Login />);

    await userEvent.type(screen.getByLabelText('Username'), 'mark');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpassword');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));
    await waitFor(() => screen.getByText('Invalid username or password'));

    await userEvent.type(screen.getByLabelText('Password'), 'x');
    expect(screen.queryByText('Invalid username or password')).not.toBeInTheDocument();
  });

  it('does not navigate on failed login', async () => {
    mockSubmitLogin.mockRejectedValue(new Error('401'));
    render(<Login />);

    await userEvent.type(screen.getByLabelText('Username'), 'mark');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpassword');
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }));

    await waitFor(() => screen.getByText('Invalid username or password'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});