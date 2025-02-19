from marshmallow import Schema, fields, ValidationError

class FavoritePokemonSchema(Schema):
    
    poke_id = fields.Str(
        required=True,
        validate=lambda value: len(value) > 0,
        error_messages={
            "required": "El identificador del Pokémon es obligatorio"
        }
    )
    
    usuario_id = fields.Str(
        required=True,
        validate=lambda value: len(value) > 0,
        error_messages={
            "required": "El identificador del usuario es obligatorio"
        }
    )
