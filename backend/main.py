from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import os
import models
import schemas
from database import get_db
from security import hash_password, verify_password
from security import create_jwt_token
from security import verify_jwt_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app = FastAPI()

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return{"message": "API is running for FitPlan"}

@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = models.User(
        email=user.email,
        hashed_password=hash_password(user.password),
        full_name=user.full_name,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, existing_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    token_data={"user_id": existing_user.id, "email": existing_user.email, "full_name": existing_user.full_name}
    access_token = create_jwt_token(token_data)
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        
    )

    payload = verify_jwt_token(token)
    if payload is None:
        raise credentials_exception
    
    user_id = payload.get("user_id")
    if user_id is None:
        raise credentials_exception
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise credentials_exception
    
    return user

@app.get("/me", response_model=schemas.UserResponse)
def read_current_user(user: models.User = Depends(get_current_user)):
    return user

@app.post("/profile", response_model=schemas.ProfileResponse)
def create_profile(
    profile: schemas.ProfileCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing_profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")
    
    new_profile = models.Profile(
        age=profile.age,
        weight=profile.weight,
        height=profile.height,
        goal=profile.goal,
        activity_level=profile.activity_level,
        dietary_preference=profile.dietary_preference,
        user_id=current_user.id,
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@app.get("/profile", response_model=schemas.ProfileResponse)
def read_current_profile(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing_profile = db.query(models.Profile).filter(models.Profile.user_id == current_user.id).first()
    if not existing_profile:
        raise HTTPException(status_code=404, detail="Profile does not exist")
    
    return existing_profile