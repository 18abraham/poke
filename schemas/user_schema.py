from marshmallow import Schema, fields, validationError

class UserSchema(Schema):
    name = fields.Str(
        required=True,
        validate=lambda x: len(x) > 0,
        error_messages={
            "required":"la contraseña es requerida"
        }
    )
    password = fields.Str(
        required=True,
        validate=lambda x: len(x) > 0,
        error_messages={
            "required":"la contraseña es requerida"
        }
    )
    email = fields.Str(
        required=True,
        validate=lambda x: len(x) > 0,
        error_messages={
            "required":"la contraseña es requerida"
        }
    )        