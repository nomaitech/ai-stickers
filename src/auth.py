import time
import jwt
import os

ALGORITHM = "RS256"
ACCESS_TOKEN_EXPIRE = 60 * 5

JWT_PRIVATE_KEY = os.getenv("JWT_PRIVATE_KEY")
JWT_PUBLIC_KEY = os.getenv("JWT_PUBLIC_KEY")

if not (JWT_PRIVATE_KEY and JWT_PUBLIC_KEY):
    raise EnvironmentError("No JWT keys set")


def create_access_token(data: dict, expires_delta: int = ACCESS_TOKEN_EXPIRE):
    to_encode = data.copy()
    expire = int(time.time()) + expires_delta
    to_encode.update({"exp": expire})
    encoded_hwt = jwt.encode(to_encode, JWT_PRIVATE_KEY, algorithm=ALGORITHM)
    return encoded_hwt


def verify_token(token: str):
    try:
        payload = jwt.decode(token, JWT_PUBLIC_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None