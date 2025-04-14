from app import mongo

class SuperClass:
    def __init__(self, collection):
        self.collection = mongo.db[collection]
    
    def find_all(self):
        data = list(self.collection.find().sort("ID",1))
        deserealize_data = []
        for datum in data:
            datum["_id"] = str(datum["_id"])
            stats = {
                "HP": datum["HP"],
                "ATK": datum["Attack"],
                "DEF": datum["Defense"],
                "SP.Atk": datum["Sp"][" Atk"],
                "SP.Def": datum["Sp"][" Def"],
                "SPD": datum["Speed"],
            }
            datum["stats"] = stats
            datum.pop("HP")
            datum.pop("Attack")
            datum.pop("Defense")
            datum.pop("Speed")
            datum.pop("Sp")
            deserealize_data.append(datum)
        return deserealize_data

    def find_by_id(self,object_id):
        datum = self.collection.find_one({
            "_id": object_id
        })
        if datum:
            datum["_id"] = str(datum["_id"]) 
        return datum
    
    def create(self,data):
        datum = self.collection.insert_one(data)
        return str(datum.inserted_id)

    def update(self, object_id, data):
        self.collection.update_one({
            "_id":object_id
        },{
            "$set":data
        })
        datum = self.collection.find_one({
            "_id":object_id
        })
        datum["_id"] = str(datum["_id"])
        return datum
    
    def delete(self,object_id):
        return self.collection.delete_one({"_id":object_id})
