# Setup Instructions
- Review three key external services; OpenRouter, OpenAI, and Supabase.
    - Note any special setup instructions outside of just normally setting up the service.
    - Note any values that need to be saved (ex. values that are turned into env variables).

- Step by step instructions to get backend AND frontend up & running.

# Live Application
- Frontend: https://askprysmio.vercel.app
- Backend: https://askprysmio.onrender.com

# Local Environment

## Frontend Setup (Vite + React)

## Backend Setup (FastAPI)

# Deployment

## Frontend Deployment Setup (Vercel)

## Backend Deployment Setup (Render)

## Using Application

# Supabase
account setup (same for openai and openrouter)

# OpenAI

# OpenRouter

## ENV
dont put our actual keys, probably lay down examples or point where to get it
ex:

OPENAI_LLM_KEY = api key from OpenAI

# Notes


# Setup and deployment instructions

- Local Setup
- Git clone the askprysmio repository as your own
- Cd into the askprysmio foldeer

# Frontend Setup (Vite + React)
- cd frontend
- npm install 
- npm run dev
- front end will run on http://localhost:5173

# Backend Setup (FastAPI)
- cd backend
- pip install -r requirements.text
- uvicorn main:app --reload
- backend will n on http://localhost:8000

# Deployment Setup Frontend (Vercel)
- import project into vercel
- Set enviroment variable to
- VITE_API_URL=https://askprysmio.onrender.com
- deploy it once your comfortable with settings

# Deployment Setup Backend (Render)
- Create a Web Service
- Connect your Github repo
- configure to these before deployment:
- Root Directory: backend
- Build Command: pip install -r requirements.txt
- Start Command: uvicorn main:app --host 0.0.0.0 --port 10000
- deploy it once your comfortable with settings

# Using the application
- Open the deployed frontend
- Enter a message in the chatbot
- The frontend sends a POST request to the backend
- The chatbot response is displayed on screen

# Notes 
- Render free tier may take ~30–50 seconds to wake up after inactivity
- Ensure API keys are stored in environment variables (not in code)

