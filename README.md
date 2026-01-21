# Contract Management Platform

An end-to-end full-stack Contract Management Platform demonstrating
backend-driven lifecycle enforcement and frontend integration.

## Features
- Blueprint management
- Contract creation from blueprint
- Backend-enforced contract lifecycle (state machine)
- Contract dashboard with lifecycle actions
- Contract details view with status timeline

## Tech Stack
- Backend: FastAPI, SQLAlchemy, SQLite
- Frontend: React (Vite)
- CI: GitHub Actions

## Contract Lifecycle
Created → Approved → Sent → Signed → Locked  
Revoked allowed from Created or Sent.

Lifecycle transitions are validated on backend APIs.

## Running Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
