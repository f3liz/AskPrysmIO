@echo off
echo ==========================================
echo Starting Backend Setup and Server...
echo ==========================================

:: Store the project root (parent of backend)
set ROOT=%~dp0..

:: 1. Create the virtual environment ONLY if it doesn't already exist
IF NOT EXIST "%ROOT%\venv\" (
    echo [1/4] Creating virtual environment...
    python -m venv "%ROOT%\venv"
) ELSE (
    echo [1/4] Virtual environment already exists.
)

:: 2. Activate the virtual environment
echo [2/4] Activating virtual environment...
call "%ROOT%\venv\Scripts\activate"

:: 3. Install dependencies
echo [3/4] Installing/Updating dependencies...
python -m pip install -r "%ROOT%\backend\requirements.txt"

:: 4. Start the backend from project root
echo [4/4] Starting FastAPI server...
cd "%ROOT%"
uvicorn backend.main:app --reload