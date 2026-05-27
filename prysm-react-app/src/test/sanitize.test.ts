import { describe, expect, it } from "vitest";
import { sanitizeMessage } from "../utils/sanitize";

describe("sanitizeMessage", () => {
  it("removes script tags from user messages", () => {
    const dirty = `<script>alert("xss")</script>Hello`;
    const clean = sanitizeMessage(dirty);

    expect(clean).not.toContain("<script>");
    expect(clean).not.toContain("alert");
    expect(clean).toContain("Hello");
  });

  it("removes dangerous image event handlers", () => {
    const dirty = `<img src=x onerror=alert("xss")>`;
    const clean = sanitizeMessage(dirty);

    expect(clean).not.toContain("onerror");
    expect(clean).not.toContain("alert");
  });

  it("removes javascript links", () => {
    const dirty = `<a href="javascript:alert('xss')">Click me</a>`;
    const clean = sanitizeMessage(dirty);

    expect(clean).not.toContain("javascript:");
    expect(clean).not.toContain("alert");
    expect(clean).toContain("Click me");
  });
});