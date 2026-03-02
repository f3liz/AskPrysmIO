import tiktoken

encode = tiktoken.encoding_for_model("text-embedding-3-large")

def chunk_text(text: str, max_tokens: int = 800, overlap: int = 200):
    #This is an example of chunk automation. Creating a new chunk every 500 characters
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