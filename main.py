from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

app = FastAPI()

# Command to start server
# uvicorn FastAPI.main:app --reload
# Full API documentation UI
# http://127.0.0.1:8000/docs

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    username: str
    password: str

@app.post("/create")
def create(data: User):
    print("Run function 'create'")
    data_path = "FastAPI/user.json"

    # Step 1: Load old data
    try:
        with open(data_path, "r") as f:
            users = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        users = []

    # Step 2: Append new data (as dictionary)
    users.append(data.dict())

    # Step 3: Save back to file
    with open(data_path, "w") as f:
        json.dump(users, f, indent=4)

    return {"username": data.username}

@app.get("/show")
def show():
    data_path = "FastAPI/user.json"

    # Step 1: Load old data
    try:
        with open(data_path, "r") as f:
            users = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        users = []

    return users