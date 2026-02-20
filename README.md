# ATS Resume Checker

## Run (macOS / Linux)
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

Open: http://127.0.0.1:8000
