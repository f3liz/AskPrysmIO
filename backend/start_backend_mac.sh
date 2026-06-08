#!/bin/bash

echo "=========================================="
echo "Starting Backend Setup and Server..."
echo "=========================================="

# 1. Lock script execution context to the directory containing this script
cd "$(dirname "$0")"

# 2. Create the virtual environment ONLY if it doesn't already exist
if [ ! -d "venv" ]; then
    echo "[1/4] Creating virtual environment..."
    python3 -m venv venv
else
    echo "[1/4] Virtual environment already exists."
fi

# 3. Activate the virtual environment
echo "[2/4] Activating virtual environment..."
source venv/bin/activate

# 4. Install dependencies
echo "[3/4] Installing/Updating dependencies..."
python -m pip install -r requirements.txt

# 5. Start the backend from the root context
echo "[4/4] Starting FastAPI server..."

# Move to the root project directory so python can resolve 'backend.routers'
cd ..

# Execute uvicorn pointing to the backend package
uvicorn backend.main:app --reload