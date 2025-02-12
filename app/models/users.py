from app import mongo

class Users(SuperClass):
    def __init__(self):
        super().__init__("users")

    def find_all(self):
        raise NotImplementedError("no es necesario obtener todos los usuarios")    
    