from app import mongo
from app.models.superclase import SuperClase

class Pokemon(SuperClase):
    def __init__(self):
        super().__init__("pokemons")

    def create(self, data):
       raise NotImplementedError("Los pokemones no se pueden crear")  
    
    def delete(self, object_id):
        raise NotImplementedError("Los pokemones no se pueden eliminar")  
    
    def update(self, object_id, data):
        raise NotImplementedError("Los pokemones no se pueden actualizar")  
    
    def find_all(self):
        return super().find_all()
    
    def find_one(self, object_id):
        return super(object_id).find_one()