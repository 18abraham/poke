from app.models.pokemon import Pokemon
from app.models.pokemon_favorities import PokemonFavorites
from app.models.user import User

class ModelFavorite():
    @staticmethod
    def get_model(colection_name):
        models = {
            "users": User,
            "pokemons": Pokemon,
            "pokemon_favorite": PokemonFavorites
        }
        if colection_name in models:
            return models[colection_name]() 
        raise ValueError(f"La colección enviada: {colection_name} no existe")
