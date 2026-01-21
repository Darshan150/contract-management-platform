# Contract Management Platform

A production-style **full-stack Contract Management Platform** demonstrating
backend-driven workflow enforcement, clean REST APIs, and modern frontend integration.

The system ensures that **all contract lifecycle transitions are validated on the backend**, reflecting real-world enterprise design principles.

---

## 🌐 Live Deployment

- **Frontend:** https://contract-frontend.onrender.com/
- **Backend API (Swagger):** https://contract-management-platform-t4n2.onrender.com/docs

---

## ✨ Features

- Blueprint-based contract templates
- Contract creation from predefined blueprints
- Backend-enforced contract lifecycle (state machine)
- Contract dashboard with lifecycle-based actions
- Secure and validated state transitions
- Dockerized full-stack deployment

---

## 🧱 Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn

### Frontend
- React (Vite)
- Component-based UI
- API-driven state management

### DevOps / CI
- Docker & Docker Compose
- GitHub Actions (CI)
- Render (Docker-based deployment)

---

## 🔁 Contract Lifecycle

Created → Approved → Sent → Signed → Locked


### Special Rules
- **Revoked** is allowed from:
  - `Created`
  - `Sent`

All lifecycle transitions are **validated exclusively on backend APIs**.

---

## 🧪 Backend Validation

- Invalid transitions are rejected with proper HTTP errors
- Backend acts as the **single source of truth**
- Frontend dynamically enables/disables actions based on contract state

---

## 🖥️ Running Locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
Backend:

http://127.0.0.1:8000


Swagger:

http://127.0.0.1:8000/docs

Frontend
cd frontend
npm install
npm run dev


Frontend:

http://localhost:5173

🔐 Environment Variables
Frontend
VITE_API_URL=http://localhost:8000

👤 Author

Darshan Varude
DevOps & Full-Stack Engineer
GitHub: https://github.com/Darshan150
