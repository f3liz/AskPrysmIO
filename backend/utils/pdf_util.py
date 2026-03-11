import pymupdf
import re

def clean_pdf_text(text: str) -> str:
    text = text.replace("\r", "\n")

    text = re.sub(r"(\w+)-\n(\w+)", r"\1\2", text)

def extract_text(pdf_bytes: bytes):
    doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
    pages = []

    for i, page in enumerate(doc):
        pages.append({
            "page_number": i + 1,
            "content": page.get_text()
        })

    return pages