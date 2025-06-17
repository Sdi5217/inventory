from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import SessionLocal, engine, Base
import models

app = FastAPI()
Base.metadata.create_all(bind=engine)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class Item(BaseModel):
    name: str
    quantity: int

@app.get("/items")
def get_items():
    db = SessionLocal()
    items = db.query(models.Item).all()
    return items

@app.post("/items")
def add_item(item: Item):
    db = SessionLocal()
    db_item = models.Item(name=item.name, quantity=item.quantity)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
