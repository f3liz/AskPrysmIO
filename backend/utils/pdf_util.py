import pymupdf
import re

def clean_pdf_text(text: str) -> str:
    text = text.replace("\r", "\n")

    text = re.sub(r"(\w+)-\n(\w+)", r"\1\2", text)

    text = re.sub(r"(?<!\n)\n(?!\n)", " ", text)

    text = re.sub(r"\n{2,}", "\n\n", text)

    text = re.sub(r"[ \t]+", " ", text)

    return text.strip()


def extract_text(pdf_bytes: bytes):
    doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
    pages = []

    for i, page in enumerate(doc):
        pdf_text = page.get_text()

        cleaned_text = clean_pdf_text(pdf_text)

        pages.append({
            "page_number": i + 1,
            "content": cleaned_text
        })

    return pages