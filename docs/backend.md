# Backend Documentation

## Overview

The backend is built using FastAPI and is responsible for:

- Handling API requests from the frontend.
- Processing user questions.
- Extracting and embedding PDF content.
- Storing and retrieving embeddings from the database.
- Sending user questions and retrieved context to OpenRouter to generate responses.

## Quick Links
- [Environment Configuration](env.md)
- [Utility Functions](utilities.md)
- [API Documentation](api.md)
  
## Tech Stack

Major libraries and tools used.
- Python
- FastAPI
- Pydantic
- OpenRouter
- PyMuPDF
- tiktoken

## Running the Backend
**Both configurations require that you be inside the `backend`.**
### Mac:
```
python3 -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
uvicorn main:app --reload
```
### Windows:
```
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
uvicorn main:app --reload
```


## Core Backend Concepts
### APIRouter
`APIRouter` allows endpoints to be grouped in FastAPI.  

This improves project organization by separating routes into different files while sharing a common prefix.

**Example:**

If a router is defined with the prefix: `/chat`, all endpoints inside that router will begin with `/chat`.

### Pydantic Models
Pydantic models are used to define structured request and response data.

Benefits include:

- Automatic request validation
- Automatic type conversion
- Structured API documentation
- Clear data contracts between frontend and backend
