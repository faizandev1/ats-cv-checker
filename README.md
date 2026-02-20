# ATS Resume Checker

A professional Applicant Tracking System (ATS) Resume Analyzer built with Python and FastAPI.  
This application evaluates resumes, extracts key information, and provides an ATS compatibility score with detailed feedback to help improve job application success.

---
<img width="1255" height="675" alt="Screenshot 2026-02-21 at 12 27 30 AM" src="https://github.com/user-attachments/assets/4d4242c2-8e57-4a55-8259-f86670639492" />
<img width="1255" height="675" alt="Screenshot 2026-02-21 at 12 27 48 AM" src="https://github.com/user-attachments/assets/1bdce24d-4e47-470a-a208-1957041c1151" />
<img width="1255" height="675" alt="Screenshot 2026-02-21 at 12 28 04 AM" src="https://github.com/user-attachments/assets/e8084820-4bdd-4742-84c0-da8fde217337" />

## Tech Stack

**Backend**
- Python
- FastAPI
- Uvicorn

**Frontend**
- HTML
- CSS
- JavaScript

**Document Processing**
- pdfplumber (PDF parsing)
- python-docx (DOCX parsing)

---

## Features

- Upload resumes in **PDF or DOCX**
- Extract key details:
  - Name
  - Email
  - Phone number
  - LinkedIn
  - GitHub
  - Skills
  - Education
  - Experience
- ATS score out of 100
- Resume parsing rate
- Section detection analysis
- Keyword-based evaluation
- Improvement suggestions
- Clean and responsive dashboard UI

---

## Project Structure

```
ats-cv-checker/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── static/
│   └── templates/
│
├── frontend/
└── README.md
```

---

## Installation (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/faizandev1/ats-cv-checker.git
cd ats-cv-checker/backend
```

---

### 2. Create virtual environment

**Mac / Linux**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Windows**
```bash
python -m venv .venv
.venv\Scripts\activate
```

---

### 3. Install dependencies

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

---

### 4. Run the server

```bash
uvicorn app:app --reload --port 8000
```

Open in browser:

```
http://127.0.0.1:8000
```

---

## Preview

ATS dashboard with:
- Score meter
- Resume analysis summary
- Detailed validation checks
- Actionable suggestions

---

## Future Improvements

- Job description matching
- AI-based keyword recommendations
- User authentication
- Cloud deployment

---

## Author

Faizan Ahmad  
GitHub: https://github.com/faizandev1

---

## License

This project is for educational and portfolio purposes.
