from argon2 import PasswordHasher

ph = PasswordHasher()


def hash_password(password):
    hashed_pwd = ph.hash(password)
    return hashed_pwd
