## Utility Functions
This section documents the utility functions responsible for handling critical processes in AskPrysmiO.

- [Chunking Util](#chunking-util)
- [PDF Util](#pdf-util)
- [Question Retrieval Util](#question-retrieval-util)


## Embedding Util
Generates vector embeddings for text using the OpenAI embeddings API. Embeddings are numerical representations of text that can be used for tasks like semantic search,
clustering, or similarity comparisons.

### This module:
- Imports the OpenAI Client.
- Loads the API key (`OPENAI_EMBEDDING_KEY`) from `config.py`.
- Initializes the OpenAI client using that API key.

### Function: `embed_text`
**Input:** A List of text strings (`text_chunks`) OR one singular line of text.

**Output:**
- A list of embeddings
- Each embedding is a list of floating-point numbers.

### How It Works
1. The function receives a list of text chunks.
2. These chunks are sent to the OpenAI embedding API.
3. The API returns a vector embedding for each text chunk.
4. The function returns the embeddings in the same order as the input.


## Chunking Util
Splits large text into smaller segments for processing by the embedding model.

### Function: `chunk_text`
### Function Parameters
| Parameter  | Description                       | Default  |
|------------|-----------------------------------|----------|
| text       | The text to be split into chunks. | required |
| max_tokens | Maximum tokens per chunk.         | 800      |
| overlap    | Tokens shared between chunks.     | 200      |

### Why Overlap is Important
Overlap preserves context between chunks.

Without overlap, important information near chunk boundaries may be lost when embeddings are generated.

### How It Works
1. The text is tokenized using `tiktoken`.
2. A starting index is initialized at `0`.
3. A chunk of `max_tokens` is created.
4. The starting index moves forward while maintaining the overlap.
5. The process repeats until the entire text has been processed.
6. The function returns a list of text chunks.


## PDF Util
Provides utilities for text extraction and cleaning from uploaded PDFs.
### Function: `extract_text`
**Input:** `text`(str): Raw text extracted from a PDF page.

**Output:** Cleaned text as a string

### How It Works
1. The PDF file is read into memory using FastAPI's `file.read()` function.
2. The file then opened using `pymupdf.open`.
3. PyMuPDF reads the PDF directly from memory, so the file does not need to be saved to disk.
4. The document is processed page by page.
5. Text is extracted from each page.
6. Extracted text is then sent to `clean_pdf_text` for cleaning.
7. The normalized text is then returned as a list where each element represents the content of one page.


### Cleaning Steps (`clean_pdf_text`)
1. Replace carriage returns (`\r`) with newlines (`\n`).
2. Fix hyphenated words split across lines (e.g., `"authen-\nticate"` --> `"authenticate"`).
3. Merge single newlines into spaces to preserve sentence flow while keeping paragraph breaks.
4. Normalize multiple consecutive newlines to exactly two, preserving paragraph separation.
5. Collapse multiple spaces or tabs into a single space.
6. Strip leading and trailing whitespace.


## Question Retrieval Util
