# System Architecture


## Embedding Pipeline
This pipeline is triggered whenever a PDF is uploaded through the admin interface.
```
PDF Upload (Frontend / Admin)
    ↓
Text Extraction (Backend)
    ↓
Text Cleaning & Preprocessing (Backend)
    ↓
Text Chunking (Backend)
    ↓
Embedding Generation (OpenAI API)
    ↓
Embeddings stored in Vector Database
```

## Chatbot Flow
This flow runs when a user submits a question through the chatbot interface.
```
User Submits a Question (Frontend)
    ↓
Question is converted into an embedding (Backend)
    ↓
A similarity search is performed against the context database
    ↓
Relevant context is retrieved
    ↓
Context + original question are inserted into a prompt template
    ↓
Prompt is sent to the LLM (OpenRouter)
    ↓
LLM generates a response
    ↓
Response is displayed on the frontend
```
