from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str | None = None

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str | None = "bearer"

class ProfileCreate(BaseModel):
    age: int | None = None
    weight: float | None = None
    height: float | None = None
    goal: str | None = None
    activity_level: str | None = None
    dietary_preference: str | None = None

class ProfileResponse(BaseModel):
    id: int
    age: int | None = None
    weight: float | None = None
    height: float | None = None
    goal: str | None = None
    activity_level: str | None = None
    dietary_preference: str | None = None
    user_id: int

    class Config:
        from_attributes = True