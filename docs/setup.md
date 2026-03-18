# Setup Instructions
- Review three key external services; OpenRouter, OpenAI, and Supabase.
    - Note any special setup instructions outside of just normally setting up the service.
    - Note any values that need to be saved (ex. values that are turned into env variables).

- Step by step instructions to get backend AND frontend up & running.

# Live Application
- Frontend: https://askprysmio.vercel.app
- Backend: https://askprysmio.onrender.com

# Setup and deployment instructions
- Local Setup
- Git clone the askprysmio repository as your own
- Cd into the askprysmio folder

# Local Environment
- Navigate to the front end
- cd frontend
- Install dependencies
- npm install
- Run development server
- npm run dev
- Frontend will run on http://localhost:5173

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

# Frontend Deployment Setup (Vercel)
- import project into vercel
- Set enviroment variable to the backend API
- deploy it once your comfortable with settings

# Backend Deployment Setup (Render)
- Create a Web Service
- Connect your Github repo
- configure to these before deployment:
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
- create an account at https://supabase.com
- create a new project
- copy your project url, anon/public key
- add them to your backend enviroment variables

# OpenAI
- create an account at https://platform.openai.com
- Generate an API key
- add the key to your enviroment variables

# OpenRouter
- create an account at https://openrouter.ai
- generate an API key
- add the key to your enviroment variables

# ENV
- put al your API keys in a env file. One for the frontend and one for the back end
- EXAMPLE: 
- OPENAI_LLM_KEY=your_openai_api_key 
- OPENROUTER_API_KEY=your_openrouter_key 
- SUPABASE_URL=your_supabase_url 
- SUPABASE_KEY=your_supabase_key

- Frontend .env
- VITE_API_URL=http://localhost:8000

# Notes
- Render free tier may take ~30–50 seconds to wake up after inactivity
- Ensure API keys are stored in environment variables (not in code)








