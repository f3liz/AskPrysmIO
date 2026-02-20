def chunk_text(text: str, chunk_size: int = 500):
    #This is an example of chunk automation. Creating a new chunk every 500 characters
    return [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]