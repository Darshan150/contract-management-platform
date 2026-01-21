from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
from models import Blueprint, Contract
from lifecycle import is_valid_transition
from pydantic import BaseModel
from typing import List
from datetime import datetime

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Contract Management Platform")

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

# ---------- ROOT ----------
@app.get("/")
def health():
    return {"status": "Backend running"}

# ---------- STARTUP SEED ----------
@app.on_event("startup")
def seed_blueprint():
    db = SessionLocal()
    if db.query(Blueprint).count() == 0:
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

# ---------- BLUEPRINTS ----------
@app.post("/blueprints")
def create_blueprint(data: BlueprintCreate):
    db = SessionLocal()
    bp = Blueprint(**data.dict())
    db.add(bp)
    db.commit()
    db.refresh(bp)
    return bp

@app.get("/blueprints")
def list_blueprints():
    db = SessionLocal()
    return db.query(Blueprint).all()

# ---------- CONTRACTS ----------
@app.post("/contracts")
def create_contract(data: ContractCreate):
    db = SessionLocal()

    blueprint = db.query(Blueprint).get(data.blueprint_id)
    if not blueprint:
        raise HTTPException(400, "Blueprint does not exist")

    contract = Contract(
        name=data.name,
        blueprint_id=data.blueprint_id,
        fields=data.fields,
        status="Created",
        created_at=datetime.utcnow()
    )

    db.add(contract)
    db.commit()
    db.refresh(contract)
    return contract

@app.get("/contracts")
def list_contracts():
    db = SessionLocal()
    return db.query(Contract).all()

@app.post("/contracts/{contract_id}/transition")
def transition(contract_id: int, state: str):
    db = SessionLocal()
    contract = db.query(Contract).get(contract_id)

    if not contract:
        raise HTTPException(404, "Contract not found")

    if not is_valid_transition(contract.status, state):
        raise HTTPException(
            400,
            f"Invalid transition from {contract.status} to {state}"
        )

    contract.status = state
    db.commit()
    return contract

