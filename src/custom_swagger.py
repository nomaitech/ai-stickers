from fastapi.openapi.utils import get_openapi
from fastapi import FastAPI

def override_openapi_schema(app: FastAPI):
    def _openapi():
        openapi_schema = get_openapi(
            title=app.title,
            version=app.version,
            openapi_version=app.openapi_version,
            summary=app.summary,
            description=app.description,
            terms_of_service=app.terms_of_service,
            contact=app.contact,
            license_info=app.license_info,
            routes=app.routes,
            webhooks=app.webhooks.routes,
            tags=app.openapi_tags,
            servers=app.servers,
            separate_input_output_schemas=app.separate_input_output_schemas,
        )
        
        openapi_schema["components"]["securitySchemes"] = {
            "BearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }

        openapi_schema.pop("security", None)

        if "/generate-sticker" in openapi_schema["paths"]:
            if "post" in openapi_schema["paths"]["/generate-sticker"]:
                openapi_schema["paths"]["/generate-sticker"]["post"]["security"] = [{"BearerAuth": []}]

        app.openapi_schema = openapi_schema
        return app.openapi_schema
    return _openapi
