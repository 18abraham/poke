from flask import Blueprint, request
from app.tools.response_manager import ResponseManager
from app.schemas.pokemon_favorito_schema import PokemonFavoriteSchema
from bson import ObjectId
from marshmallow import ValidationError
from app.models.factory import ModelFactory

bp = Blueprint("favorite_pokemon", __name__, url_prefix="/favorite-pokemons")
RM = ResponseManager()
FP_MODEL = ModelFactory.get_model("pokemon_favorites")
FP_SCHEMA = PokemonFavoriteSchema()

@bp.route("/", methods=["POST"])
def create():
    try:
        data = request.json
        data = FP_SCHEMA.validate(data)
        fp = FP_MODEL.create(data)
        return RM.success({"_id": fp})
    except ValidationError as err:
        print(err)
        return RM.error("es necesario enviar los parametros ")



@bp.route("/<string:id>", methods=["DELETE"])
def delete(id):
    FP_MODEL.delete(ObjectId(id))
    return RM.success("pokemon eliminado con exito")

@bp.route("/<string:user_id>", methods=["GET"])
def get_all(user_id):
    data = FP_MODEL.find_all()
    return RM.success(data)