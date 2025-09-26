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
            "BearerAuth": {"type": "http", "scheme": "bearer", "bearerFormat": "JWT"}
        }

        openapi_schema.pop("security", None)

        protected_routes = ["/stickers", "/stickers/{id}", "/user-info", "/topup", "/sticker-packs", "/sticker-packs/{id}", "/sticker-packs/{id}/stickers", "/payments", "/payment-status/{session_id}",]

        for path in openapi_schema["paths"]:
            if path in protected_routes:
                for method in openapi_schema["paths"][path].keys():
                    openapi_schema["paths"][path][method]["security"] = [{"BearerAuth": []}]

        app.openapi_schema = openapi_schema
        return app.openapi_schema

    return _openapi
