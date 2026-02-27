import pymupdf

def extract_text(pdf_bytes: bytes):
    """
    Extract text from PDF per page.
    Returns list of dicts: [{"page_number": 1, "text": "..."}]
    """
    doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
    pages = []

    for i, page in enumerate(doc):
        pages.append({
            "page_number": i + 1,
            "content": page.get_text()
        })

    return pages