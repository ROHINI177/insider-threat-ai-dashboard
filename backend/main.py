from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# ✅ Load .env from current directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

# ✅ Read and print DATABASE_URL
DATABASE_URL = os.getenv("DATABASE_URL")
print(f"✅ DATABASE_URL from .env: {DATABASE_URL}")

# ---------- App & Middleware ----------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Database Setup ----------
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class BehaviorLogDB(Base):
    __tablename__ = "behavior_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String)
    timestamp = Column(TIMESTAMP)
    action = Column(String)
    file_size = Column(Integer)
    ip_address = Column(String)

Base.metadata.create_all(bind=engine)

# ---------- Pydantic Schema ----------
class BehaviorLog(BaseModel):
    user_id: str
    timestamp: str
    action: str
    file_size: int
    ip_address: str

# ---------- DB Dependency ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- API Routes ----------
@app.post("/api/behavior")
def receive_behavior(log: BehaviorLog, db: Session = Depends(get_db)):
    db_log = BehaviorLogDB(**log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    print(f"✅ Saved log: {log}")
    return {"status": "saved"}

@app.get("/api/behavior")
def get_all_logs(db: Session = Depends(get_db)):
    logs = db.query(BehaviorLogDB).order_by(BehaviorLogDB.timestamp.desc()).all()
    return logs

@app.delete("/api/behavior/clear")
def clear_behavior_logs():
    db = SessionLocal()
    db.query(BehaviorLogDB).delete()
    db.commit()
    db.close()
    return {"status": "cleared"}

# Run command:
# uvicorn backend.main:app --reload
