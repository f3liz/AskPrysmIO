# AskPrysmiO
### Team Name: IO Opps

### Team Members:
- Jesse Chum
- Felix Chen
- Kimberly Mageary
- Alex Bolshakov
---
### Project Description:
Our project is a mobile-first web application designed to help NuSkin sales representatives quickly access accurate,
trustworthy information about NuSkin's newly launched product, Prysm iO. Our platform provides a simple and intuitive
interface where users can either view commonly asked questions or interact with an AI-powered assistant to receive 
clear answers based on the same internal documentation and research used to make Prysm iO.

### Quick Links for More Info

- [About NuSkin](https://www.nuskin.com/content/nuskin/en_US/about-us.html)
- [What is Prysm iO?](https://www.nuskin.com/us/en/site/opportunity/prysm-io-opportunity)

---
### Current Status (Sprint 4)

Our current MVP includes a functional chatbot powered by a Retrieval-Augmented Generation (RAG) system, along with a static FAQ page for common questions.

In upcoming sprints, we plan to focus on improving response accuracy and enhancing the overall user experience when interacting with the chatbot.

---
### Documentation
Full documentation is available in the docs folder.

- [Architecture Overview](docs/architecture.md)
- [Frontend](docs/frontend.md)
- [Backend](docs/backend.md)
- [Setup Guide](docs/setup.md)
- [API Reference](docs/api.md)
---
### Disclaimer

---

### Deployment & CI/CD
### Production Deployment

### The AskPrysmIO application is deployed using:

Frontend: Vercel
Backend: Render
Source Control: GitHub
Continuous Integration: GitHub Actions

The frontend is hosted at:

https://askprysmio.vercel.app

The backend is hosted at:

https://askprysmio.onrender.com
Environment Variables
Frontend (Vercel)

### Required environment variables:

VITE_BACKEND_API_ROUTE=https://askprysmio.onrender.com/chats/
VITE_BACKEND_API_ROUTE_AUTH=https://askprysmio.onrender.com/auth/
VITE_BACKEND_API_ROUTE_EMBEDDINGS=https://askprysmio.onrender.com/embeddings/

### Backend (Render)
### Required environment variables:

SUPABASE_URL=
SUPABASE_KEY=
SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE=
OPENROUTER_API_KEY=

These values are stored securely in Render and are not committed to the repository.

### Continuous Integration

GitHub Actions automatically validates frontend and backend changes when code is pushed to configured branches.

### Frontend validation:

cd prysm-react-app
npm ci
npm run build

### Backend validation:

cd backend
pip install -r requirements.txt
python -m compileall .

If any build or validation step fails, the workflow stops and the failure is displayed in GitHub Actions.

### Production Configuration

The backend CORS configuration allows requests from:

http://localhost:5173
https://askprysmio.vercel.app

This allows both local development and production deployments to communicate with the FastAPI backend.

### Deployment Verification

Production deployment was verified by:

Deploying the frontend through Vercel.
Deploying the backend through Render.
Confirming GitHub Actions successfully validates frontend and backend builds.
Confirming requests from the production frontend return HTTP 200 responses from the production backend.
Confirming no CORS or routing errors occur when communicating between the deployed frontend and backend.