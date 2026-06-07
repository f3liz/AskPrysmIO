import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { ChatSidebar } from "../components/ChatSidebar";
import { retrieveMessages } from "../api/chatHistory";
import { useChat } from "../context/useChat";
import type { Chat } from "../types";

// --- Mocks ---------------------------------------------------------------

vi.mock("../api/chatHistory", () => ({
    retrieveMessages: vi.fn(),
}));

vi.mock("../context/useChat", () => ({
    useChat: vi.fn(),
}));

const mockRetrieve = retrieveMessages as Mock;
const mockUseChat = useChat as Mock;

const startNewChat = vi.fn();
const changeActiveChat = vi.fn();

const sampleChats: Chat[] = [
    { id: "1", title: "First chat" } as Chat,
    { id: "2", title: "Second chat" } as Chat,
];

beforeEach(() => {
    vi.clearAllMocks();
    mockUseChat.mockReturnValue({ activeChat: "2", startNewChat, changeActiveChat });
});

// --- Tests ---------------------------------------------------------------

describe("ChatSidebar", () => {
    it("shows a loading state initially", () => {
        mockRetrieve.mockReturnValue(new Promise(() => {}));
        render(<ChatSidebar />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders chat history once loaded", async () => {
        mockRetrieve.mockResolvedValue(sampleChats);
        render(<ChatSidebar />);

        await waitFor(() => {
            expect(screen.getByText("First chat")).toBeInTheDocument();
        });
        expect(screen.getByText("Second chat")).toBeInTheDocument();
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    it("applies the active class only to the active chat", async () => {
        mockRetrieve.mockResolvedValue(sampleChats);
        render(<ChatSidebar />);

        await waitFor(() => screen.getByText("Second chat"));

        const inactive = screen.getByText("First chat").closest(".chat-history-item");
        const active = screen.getByText("Second chat").closest(".chat-history-item");
        expect(inactive).not.toHaveClass("active");
        expect(active).toHaveClass("active");
    });

    it("calls changeActiveChat with the chat id when an item is clicked", async () => {
        mockRetrieve.mockResolvedValue(sampleChats);
        render(<ChatSidebar />);

        await waitFor(() => screen.getByText("First chat"));
        fireEvent.click(screen.getByText("First chat"));
        expect(changeActiveChat).toHaveBeenCalledWith("1");
    });

    it("shows an empty state when there is no history", async () => {
        mockRetrieve.mockResolvedValue([]);
        render(<ChatSidebar />);

        await waitFor(() => {
            expect(screen.getByText("No chat history")).toBeInTheDocument();
        });
    });

    it("shows an error message when the fetch fails", async () => {
        mockRetrieve.mockRejectedValue(new Error("network"));
        render(<ChatSidebar />);

        await waitFor(() => {
            expect(screen.getByText("Failed to load chat history.")).toBeInTheDocument();
        });
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    it("calls startNewChat when the New Chat button is clicked", async () => {
        mockRetrieve.mockResolvedValue(sampleChats);
        render(<ChatSidebar />);

        fireEvent.click(screen.getByRole("button", { name: "New Chat" }));
        expect(startNewChat).toHaveBeenCalledTimes(1);
    });

    it("does not set state after unmount (cleanup guard)", async () => {
        let resolve!: (value: Chat[]) => void;
        mockRetrieve.mockReturnValue(new Promise<Chat[]>((r) => { resolve = r; }));

        const { unmount } = render(<ChatSidebar />);
        unmount();
        resolve(sampleChats);

        await waitFor(() => {
            expect(screen.queryByText("First chat")).not.toBeInTheDocument();
        });
    });
});