import re


def sanitize_input(text: str) -> str:
    if not text:
        return ""

    text = re.sub(r"<script.*?>.*?</script>", "", text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r"javascript:", "", text, flags=re.IGNORECASE)
    text = re.sub(r"on\w+\s*=", "", text, flags=re.IGNORECASE)

    return text.strip()