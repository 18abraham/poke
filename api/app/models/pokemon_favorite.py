from app import mongo
from app.models.super_clase import SuperClass
from bson import ObjectId

class PokemonFavorites(SuperClass):
    def __init__(self):
        super().__init__("pokemon_favorites")
        
    def update(self, object_id, data):
        raise NotImplementedError("Los pokemones no se pueden actualizar")
    
    def find_by_id(self,object_id):
        raise NotImplementedError("Los pokemones no se pueden encontrar de manera individual")
    
    def find_all(self, user_id):
        #data = list(self.collection.find({"user_id": ObjectId(user_id)}))
        #AGGREGATE
        #Pipelines > multiples objetos
        data = list(self.collection.aggregate([
                #Primer paso hacer match con el usuario!
                {
                    "$match":{
                        "user_id": ObjectId(user_id)
                    }
                },
                #[Multiples registros]
                {
                    "$lookup":{
                        "from":"pokemons",
                        "localField":"pokemon_id",
                        "foreignField":"_id",
                        "as":"pokemon"
                    }
                },
                {"$unwind":"$pokemon"},
                #Multiples registros pero ahora con un campo extra que es "pokemon"
                {
                    "$lookup":{
                        "from":"users",
                        "localField":"user_id",
                        "foreignField":"_id",
                        "as":"user"
                    }
                },
                {"$unwind":"$user"},
                #Multiples registros pero ahora con un campo extra mas que es "user"
                {
                    "$project":{
                        "user":1,
                        "pokemon":1,    
                        "_id":0
                    }
                }
            ]))
        formated_data = []
        for datum in data:
            print(datum)
            datum["user"]["_id"]=str(datum["user"]["_id"])
            datum["pokemon"]["_id"]=str(datum["pokemon"]["_id"])
            stats = {
                "HP": datum["pokemon"]["HP"],
                "ATK": datum["pokemon"]["Attack"],
                "DEF": datum["pokemon"]["Defense"],
                "SP.Atk": datum["pokemon"]["Sp"][" Atk"],
                "SP.Def": datum["pokemon"]["Sp"][" Def"],
                "SPD": datum["pokemon"]["Speed"],
            }
            datum["pokemon"]["stats"] = stats
            datum["pokemon"].pop("HP")
            datum["pokemon"].pop("Attack")
            datum["pokemon"].pop("Defense")
            datum["pokemon"].pop("Speed")
            datum["pokemon"].pop("Sp")
            formated_data.append(datum)
        return formated_data
    
    def create(self, data):
        print("LA DATA DEL POKEMON",data)
        data["user_id"] = ObjectId(data["user_id"])
        data["pokemon_id"] = ObjectId(data["pokemon_id"])
        datum = self.collection.insert_one(data)
        return str(datum.inserted_id)
