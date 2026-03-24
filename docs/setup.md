# Setup Instructions
- Review three key external services; OpenRouter, OpenAI, and Supabase.
    - Note any special setup instructions outside of just normally setting up the service.
    - Note any values that need to be saved (ex. values that are turned into env variables).

- Step by step instructions to get backend AND frontend up & running.

# Live Application
- Frontend: https://askprysmio.vercel.app
- Backend: https://askprysmio.onrender.com

# Setup and deployment instructions
- git clone the AskPrysmIO repository as your own
- cd into the AskPrysmIO folder

# Local Environment
Steps to setup locally
## Frontend Setup (Vite + React)
- cd into prysm-react-app
- npm i
- npm run dev
- frontend will run on http://localhost:5173
- Shut down instructions:
    - ctrl + c to end front end

## Backend Setup (FastAPI)
- cd into backend
- For Mac:
```
python3 -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
uvicorn main:app --reload
```
- For Windows:
```
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
uvicorn main:app --reload
```
- After first time installation, to run backend normally just repeat lines 2 and 4 of code above
- backend will run on http://localhost:8000
- Shut down instructions:
    - ctrl + c to end backend
    - type deactivate to shut down virtual environment

# Hosting/Deployment
Steps for hosting/deployment
## Frontend Deployment Setup (Vercel)
- Import project into vercel
- Set enviroment variable to the backend API URL
- deploy it once your comfortable with settings

## Backend Deployment Setup (Render)
- Create a Web Service
- Connect your Github repo
- Configure to these before deployment:
    - Root Directory: backend
    - Build Command: pip install -r requirements.txt
    - Start Command: uvicorn main:app --host 0.0.0.0 --port 10000
- deploy it once your comfortable with settings


# Using Application
- Open the deployed frontend
- Enter a message in the chatbot
- The frontend sends a POST request to the backend
- The chatbot response is displayed on screen

# Supabase
- Create an account at https://supabase.com
- Create a new project
- Copy your project url and anon/public key
- Add them to your backend enviroment variables
- Create table to store embeddings

# OpenAI
- Create an account at https://platform.openai.com
- Generate an API key for embeddings
- Add the key to your backend env

# OpenRouter
- Create an account at https://openrouter.ai
- Generate an API key
- Add the key to your backend env

# ENV
- Have two envs, one for backend and one for frontend

- Backend env requirements: 
    - SUPABASE_URL
    - SUPABASE_SERVICE_ROLE_KEY
    - OPENAI_EMBEDDING_KEY
    - OPENROUTER_API_KEY
    - OPENROUTER_BASE_URL
    - APP_URL
    - APP_NAME
    - LLM_MODEL
    - ADMIN_USER
    - ADMIN_PASSWORD
    - ACCESS_TOKEN_EXPIRE_MINUTES
    - ALGORITHM
    - SECRET_KEY

- Frontend env requirements:
    - VITE_API_URL=(your backend URL)

# Notes
- Render free tier may take ~30–50 seconds to wake up after inactivity
- Ensure API keys are stored in environment variables








