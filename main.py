from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
import bcrypt

# ------------------------
# --- Password Hashing ---
# ------------------------
def hash_password(raw_password:str):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(raw_password.encode('utf-8'), salt)
    return hashed.decode()

def verify_password(raw_password:str, hashed_password:str):
    return bcrypt.checkpw(raw_password.encode('utf-8'), hashed_password.encode('utf-8'))


# Command to start server
# uvicorn main:app --reload
# Full API documentation UI
# http://127.0.0.1:8000/docs

app = FastAPI()

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

data_path = "user.json"

# ----------------------
# --- Create Section ---
# ----------------------
@app.post("/create")
def create(data: User):
    # Load old data
    try:
        with open(data_path, "r") as f:
            users = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        users = []

    if any(u["username"] == data.username for u in users):
        return {"error": "Username has been used!"}

    # Append new data (as dictionary)
    hashed_pw = hash_password(data.password)
    users.append({
        "username": data.username,
        "password": hashed_pw
    })

    # Step 3: Save back to file
    with open(data_path, "w") as f:
        json.dump(users, f, indent=4)

    return {"username": data.username}

# --------------------------
# --- Show all usernames ---
# --------------------------
@app.get("/show")
def show():
    # Step 1: Load old data
    try:
        with open(data_path, "r") as f:
            users = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        users = []

    return users

# ---------------------------------
# --- Check username & password ---
# ---------------------------------
@app.post("/check")
def check(data: User):
    # Load users
    try:
        with open(data_path, "r") as f:
            users = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        users = []

    # Check username exists
    user = next((u for u in users if u["username"] == data.username), None)

    if not user:
        return {"error": "Username not found!"}

    # Check password match
    if verify_password(data.password, user['password']):
        return {"success": True, "username": user["username"]}
    else:
        return {"error": "Incorrect password!"}

# ------------------
# --- Delete All ---
# ------------------
@app.delete("/delete_all")
def delete_all():
    with open(data_path, "w") as f:
        json.dump([], f, indent=4)
    return {"success": True}

# -------------------
# --- Delete User ---
# -------------------
@app.delete("/delete_user/{username}")
def delete_user(username: str):
    try:
        with open(data_path, "r") as f:
            users = json.load(f)
    except:
        users = []

    # filter user list
    new_users = [u for u in users if u["username"] != username]

    # user not found
    if len(new_users) == len(users):
        return {"error": "User not found"}

    # save updated list
    with open(data_path, "w") as f:
        json.dump(new_users, f, indent=4)

    return {"success": True, "deleted": username}

