import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import FAQ from "../components/FAQ";
import { prysmFaqData } from "../data/prysmFaqData";

// Mock AccordionItem so we only test FAQ logic
vi.mock("../components/AccordionItem.tsx", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="faq-item">{title}</div>
  ),
}));

// Mock SearchBar and simulate filtering behavior
vi.mock("../components/SearchBar", () => ({
  SearchBar: ({ onSearch }: any) => (
    <input
      placeholder="Search FAQs..."
      onChange={(e) => {
        const query = e.target.value.toLowerCase();

        const filtered = prysmFaqData.filter((faq) =>
          faq.question.toLowerCase().includes(query) ||
          JSON.stringify(faq.sections).toLowerCase().includes(query)
        );

        onSearch(filtered);
      }}
    />
  ),
}));
// Added in 5 different tests below that all test functionality
describe("FAQ Search Functionality", () => {

  test("renders all FAQs by default", () => {
    render(<FAQ />);
    const items = screen.getAllByTestId("faq-item");
    expect(items.length).toBe(prysmFaqData.length);
  });

  test("filters FAQs when typing", async () => {
    render(<FAQ />);
    const input = screen.getByPlaceholderText("Search FAQs...");

    await userEvent.type(input, prysmFaqData[0].question);

    const items = screen.getAllByTestId("faq-item");
    expect(items.length).toBe(1);
  });

  test("search is case insensitive", async () => {
    render(<FAQ />);
    const input = screen.getByPlaceholderText("Search FAQs...");

    await userEvent.type(input, prysmFaqData[0].question.toUpperCase());

    expect(screen.getByText(prysmFaqData[0].question)).toBeInTheDocument();
  });

  test("shows message when no results match", async () => {
    render(<FAQ />);
    const input = screen.getByPlaceholderText("Search FAQs...");

    await userEvent.type(input, "zzzzzzzz");

    expect(
      screen.getByText("Please refer to Ask PrysmIO")
    ).toBeInTheDocument();
  });

  test("clearing input restores full FAQ list", async () => {
    render(<FAQ />);
    const input = screen.getByPlaceholderText("Search FAQs...");

    await userEvent.type(input, "zzzzzzzz");
    await userEvent.clear(input);

    const items = screen.getAllByTestId("faq-item");
    expect(items.length).toBe(prysmFaqData.length);
  });

});