from flask import jsonify

class ResponseManager:
    def succes (self,data):
        if isinstance(data, str):
            data = {
                "message": data
            }  
        return jsonify(data),200
    
    def error (self,data="Invalid Request"):
        if isinstance(data, str):
            data = {
                "message": data
            }  
        return jsonify(data), 400
    
    def error_server (self,data="SERVER ERROR"):
        if isinstance(data, str):
            data = {
                "message": data
            }  
        return jsonify(data), 500
