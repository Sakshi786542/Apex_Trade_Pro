from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # sab allow (for testing)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# DB connection
conn = sqlite3.connect("users.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
)
""")

class User(BaseModel):
    name: str
    email: str
    password: str

@app.get("/")
def home():
    return {"message": "ApexTradePro Backend Running 🚀"}

@app.post("/register")
def register(user: User):
    cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                   (user.name, user.email, user.password))
    conn.commit()
    return {"message": "Registered successfully"}

@app.post("/login")
def login(user: User):
    cursor.execute("SELECT * FROM users WHERE email=? AND password=?",
                   (user.email, user.password))
    result = cursor.fetchone()
    
    if result:
        return {"message": "Login successful"}
    else:
        return {"message": "Invalid credentials"}