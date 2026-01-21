from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
from models import Blueprint, Contract
from lifecycle import is_valid_transition
from pydantic import BaseModel
from datetime import datetime
from typing import List

# ---------- DB INIT ----------
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Contract Management Platform")

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend on Render
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- SCHEMAS ----------
class BlueprintCreate(BaseModel):
    name: str
    fields: list

class ContractCreate(BaseModel):
    name: str
    blueprint_id: int
    fields: list = []

# ---------- HEALTH ----------
@app.get("/")
def health():
    return {"status": "Backend running"}

# ---------- STARTUP SEED ----------
@app.on_event("startup")
def seed_blueprint():
    db = SessionLocal()
    try:
        exists = db.query(Blueprint).first()
        if not exists:
            bp = Blueprint(
                name="Employment Contract",
                fields=[
                    {"type": "text", "label": "Employee Name"},
                    {"type": "date", "label": "Start Date"},
                    {"type": "signature", "label": "Employee Signature"},
                ]
            )
            db.add(bp)
            db.commit()
    finally:
        db.close()

# ---------- BLUEPRINTS ----------
@app.post("/blueprints")
def create_blueprint(data: BlueprintCreate):
    db = SessionLocal()
    try:
        bp = Blueprint(**data.dict())
        db.add(bp)
        db.commit()
        db.refresh(bp)
        return bp
    finally:
        db.close()

@app.get("/blueprints")
def list_blueprints():
    db = SessionLocal()
    try:
        return db.query(Blueprint).all()
    finally:
        db.close()

# ---------- CONTRACTS ----------
@app.post("/contracts")
def create_contract(data: ContractCreate):
    db = SessionLocal()
    try:
        blueprint = db.query(Blueprint).get(data.blueprint_id)
        if not blueprint:
            raise HTTPException(status_code=400, detail="Blueprint does not exist")

        contract = Contract(
            name=data.name,
            blueprint_id=data.blueprint_id,
            fields=data.fields,
            status="Created",
            created_at=datetime.utcnow(),
        )

        db.add(contract)
        db.commit()
        db.refresh(contract)
        return contract
    finally:
        db.close()

@app.get("/contracts")
def list_contracts():
    db = SessionLocal()
    try:
        return db.query(Contract).all()
    finally:
        db.close()

@app.post("/contracts/{contract_id}/transition")
def transition(contract_id: int, state: str):
    db = SessionLocal()
    try:
        contract = db.query(Contract).get(contract_id)
        if not contract:
            raise HTTPException(status_code=404, detail="Contract not found")

        if not is_valid_transition(contract.status, state):
            raise HTTPException(
                status_code=400,
                detail=f"Invalid transition from {contract.status} to {state}",
            )

        contract.status = state
        db.commit()
        return contract
    finally:
        db.close()

