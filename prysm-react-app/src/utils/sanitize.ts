import DOMPurify from "dompurify";

export function sanitizeMessage(content: string): string {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "code",
      "pre",
      "a"
    ],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}