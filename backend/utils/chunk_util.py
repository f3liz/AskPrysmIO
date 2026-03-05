import tiktoken

encode = tiktoken.encoding_for_model("text-embedding-3-small")

def chunk_text(text: str, max_tokens: int = 400, overlap: int = 100):
    
    tokens = encode.encode(text)
    chunks = []
    start = 0

    while start < len(tokens):
        end = start + max_tokens
        chunk_tokens = tokens[start:end]
        chunk_text = encode.decode(chunk_tokens)
        chunks.append(chunk_text)
        start += max_tokens - overlap
    
    return chunks