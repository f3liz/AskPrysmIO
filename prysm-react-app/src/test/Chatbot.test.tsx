// Chatbot.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chatbot from '../components/Chatbot';
import { ChatProvider } from '../context/ChatProvider';

vi.mock('../api/chat', () => ({
  sendChatQuestion: vi.fn(),
}));

vi.mock('../context/useChat', () => ({
  useChat: vi.fn(),
}));

window.HTMLElement.prototype.scrollIntoView = vi.fn();

import { sendChatQuestion } from '../api/chat';
import { useChat } from '../context/useChat';

const mockSend = vi.mocked(sendChatQuestion);
const mockUseChat = vi.mocked(useChat);

describe('Chatbot', () => {
  const renderChatbot = () => {
    return render(
      <ChatProvider>
        <Chatbot />
      </ChatProvider>
    );
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });
});

describe('Chatbot', () => {
  // --- Initial render ---

  it('renders input and send button', () => {
    renderChatbot();
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('renders with empty chat', () => {
    renderChatbot();
    expect(document.querySelector('.message')).not.toBeInTheDocument();
  });

  // --- Input behavior ---

  it('updates input as user types', async () => {
    renderChatbot();
    const input = screen.getByPlaceholderText('Type your message...');
    await userEvent.type(input, 'What is RO Capable?');
    expect(input).toHaveValue('What is RO Capable?');
  });

  it('does not submit on empty input', async () => {
    renderChatbot();
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('does not submit on whitespace-only input', async () => {
    renderChatbot();
    await userEvent.type(screen.getByPlaceholderText('Type your message...'), '   ');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(mockSend).not.toHaveBeenCalled();
  });

  // --- Successful message flow ---

  it('shows user message immediately on submit', async () => {
    mockSend.mockResolvedValue('Bot response');
    renderChatbot();
    await userEvent.type(screen.getByPlaceholderText('Type your message...'), 'Hello');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(document.querySelector('.message.user p')).toHaveTextContent('Hello');
  });

  it('clears input after submit', async () => {
    mockSend.mockResolvedValue('Bot response');
    renderChatbot();

    const input = screen.getByPlaceholderText('Type your message...');
    await userEvent.type(input, 'Hello');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(input).toHaveValue('');
  });

  it('shows typing indicator while waiting for response', async () => {
    mockSend.mockReturnValue(new Promise(() => {}));
    renderChatbot();

    await userEvent.type(screen.getByPlaceholderText('Type your message...'), 'Hello');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(screen.getByRole('button')).toHaveTextContent('...');
    expect(screen.getByPlaceholderText('Type your message...')).toBeDisabled();
    expect(document.querySelector('.message.assistant.typing')).toBeInTheDocument();
  });

  it('shows bot response after API resolves', async () => {
    mockSend.mockResolvedValue('Fleet is at 94% RO Capable');
    renderChatbot();

    await userEvent.type(screen.getByPlaceholderText('Type your message...'), 'Status?');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      const assistantMessage = document.querySelector('.message.assistant:not(.typing) p');
      expect(assistantMessage).toHaveTextContent('Fleet is at 94% RO Capable');
    });
  });

  it('re-enables input and button after response', async () => {
    mockSend.mockResolvedValue('Done');
    renderChatbot();

    await userEvent.type(screen.getByPlaceholderText('Type your message...'), 'Hello');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type your message...')).not.toBeDisabled();
      expect(screen.getByRole('button')).toHaveTextContent('Send');
    });
  });

  it('calls sendChatQuestion with the correct message', async () => {
    mockSend.mockResolvedValue('response');
    renderChatbot();

    await userEvent.type(screen.getByPlaceholderText('Type your message...'), 'TPC this week?');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(mockSend).toHaveBeenCalledWith('TPC this week?');
  });

  it('shows a fallback error message when the API rejects', async () => {
    mockSend.mockRejectedValue(new Error('boom'));
    render(<Chatbot />);

    await userEvent.type(screen.getByPlaceholderText('Type your message...'), 'Hello');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(document.querySelector('.message.assistant:not(.typing) p'))
        .toHaveTextContent('Unable to answer question');
    });
    // Still recovers: input re-enabled after the error.
    expect(screen.getByPlaceholderText('Type your message...')).not.toBeDisabled();
  });

  it('shows a rate-limit message on a 429', async () => {
    mockSend.mockRejectedValue({ status: 429 });
    render(<Chatbot />);

    await userEvent.type(screen.getByPlaceholderText('Type your message...'), 'Hello');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(document.querySelector('.message.assistant:not(.typing) p'))
        .toHaveTextContent('Too many requests');
    });
  });
});