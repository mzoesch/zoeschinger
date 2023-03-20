from fastapi import FastAPI, HTTPException
from typing import List
from uuid import uuid4, UUID
from fastapi.middleware.cors import CORSMiddleware
from routes.projects.salgo import router as salgo_router

app = FastAPI()

app.include_router(salgo_router)

# origins = [
#     "http://localhost:3000/"
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def root():
    return {'Hello': 'World'}
