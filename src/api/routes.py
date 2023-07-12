"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/user', methods=['POST'])
def new_user():
    body = request.json

    if 'email' not in body:
        return jsonify({"message": "Debe ingresar un correo electronico"}), 400

    if 'password' not in body:
        return jsonify({"message": "Debe ingresar un contraseña"}), 400

    new_user = User(body['email'], body['password'])

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"user": new_user.serialize(), "token": create_access_token(identity=new_user.id)})
    except Exception as err:
        return jsonify({"message": "Ha ocurrido un error!"}), 500
    return  jsonify({"message":"Method not implemented yet!" }), 500