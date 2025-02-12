from app import mongo

class Users:

    @staticmethod
    def save(user_id, data):
        existing_user = Users.collection.find_one({"_id": user_id})
    
        if existing_user:
          Users.collection.update_one({"_id": user_id}, {"$set": data})
          return "User updated"
        else:
         data["_id"] = user_id
         Users.collection.insert_one(data)
         return "User created"
