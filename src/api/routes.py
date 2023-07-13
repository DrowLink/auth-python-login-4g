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


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user= User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
        
    access_token = create_access_token(identity=email)
    return jsonify({"access_token": access_token, "email": email})


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
        return jsonify({"user": new_user.serialize()})
    except Exception as err:
        return jsonify({"message": "Ha ocurrido un error!"}), 500
    return  jsonify({"message":"Method not implemented yet!" }), 500