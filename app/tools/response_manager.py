from flask import jsonify

class ResponseManager:
    def success(self, data):
        if type(data) == "str":
            data = {
                "message":data
            }
        return jsonify(data), 200

    def error(self, data= "invalid request"):
        if type(data) == "str":
            data = {
                "message":data
            }
        return jsonify(data), 400
    
    def error(self, data= "SERVER ERROR"):
        if type(data) == "str":
            data = {
                "message":data
            }
        return jsonify(data), 500


