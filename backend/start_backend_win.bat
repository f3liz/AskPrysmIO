@echo off
echo ==========================================
echo Starting Backend Setup and Server...
echo ==========================================

:: 1. Create the virtual environment ONLY if it doesn't already exist
IF NOT EXIST "venv\" (
    echo [1/4] Creating virtual environment...
    python -m venv venv
) ELSE (
    echo [1/4] Virtual environment already exists.
)

:: 2. Activate the virtual environment (using 'call' ensures the script keeps running)
echo [2/4] Activating virtual environment...
call venv\Scripts\activate

:: 3. Install dependencies
echo [3/4] Installing/Updating dependencies...
python -m pip install -r requirements.txt

:: 4. Start the backend
echo [4/4] Starting FastAPI server...
uvicorn main:app --reload