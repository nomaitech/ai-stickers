from fastapi.param_functions import Form
from typing_extensions import Annotated


class LoginRequestForm:
    def __init__(
        self,
        *,
        email: Annotated[
            str,
            Form(),
        ],
        password: Annotated[
            str,
            Form(json_schema_extra={"format": "password"}),
        ],
    ):
        self.email = email
        self.password = password

