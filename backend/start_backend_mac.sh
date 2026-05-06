#!/bin/bash

echo "=========================================="
echo "Starting Backend Setup and Server..."
echo "=========================================="

# 1. Create the virtual environment ONLY if it doesn't already exist
if [ ! -d "venv" ]; then
    echo "[1/4] Creating virtual environment..."
    python3 -m venv venv
else
    echo "[1/4] Virtual environment already exists."
fi

# 2. Activate the virtual environment
echo "[2/4] Activating virtual environment..."
source venv/bin/activate

# 3. Install dependencies
echo "[3/4] Installing/Updating dependencies..."
python -m pip install -r requirements.txt

# 4. Start the backend
echo "[4/4] Starting FastAPI server..."
cd ..
uvicorn backend.main:app --reload