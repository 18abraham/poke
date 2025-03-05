from app import mongo
from app.models.superclase import SuperClase
from bson import ObjectId

class PokemonFavorites(SuperClase):
    def __init__(self):
        super().__init__("pokemon_favorites")

    def find_by_id(self, object_id):
            raise NotImplementedError("El pokemon no se puede traer")
        
    def update(self, object_id, data):
            raise NotImplementedError("Los Pokemones No Se Pueden Actualizar")
    
    def create(self, data):
          data["user_id"] = ObjectId(data["user_id"])
          data["pokemon_id"] = ObjectId(data["pokemon_id"])
          datum = self.collection.insert_one(data)
          return str(datum.inserted_id)   

        
    