from fastapi import FastAPI, HTTPException
from typing import List
from uuid import uuid4, UUID
from models import User, Gender, Role
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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

db: List[User] = [
    User(id=uuid4(),
         first_name='Jamila',
         last_name='Ahmed',
         gender=Gender.female,
         roles=[Role.student],
         ),
    User(id=uuid4(),
         first_name='Alex',
         last_name='Jones',
         gender=Gender.male,
         roles=[Role.admin, Role.user],
         ),
]


@app.get('/')
def root():
    return {'Hello': 'World'}


@app.get('/api/v1/users')
async def fetch_users():
    return db


@app.post('/api/v1/users')
async def register_user(user: User):
    db.append(user)
    return {'id': user.id}


@app.delete('/api/v1/{user_id}')
async def delete_user(user_id: UUID):
    for user in db:
        if user.id == user_id:
            db.remove(user)
            return

    raise HTTPException(
        status_code=404,
        detail=f'{user_id} does not exists.'
    )
