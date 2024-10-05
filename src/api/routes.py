"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Blueprint, request, jsonify
from api.models import db, User, People, Planet, FavoritePeople, FavoritePlanet
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint("api",__name__)


@api.route('/signup', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email:
        return jsonify({"status": "fail", "message": "Email is required"}), 422
    
    if not password:
        return jsonify({"status": "fail", "message": "Password is required"}), 422

    found = User.query.filter_by(email=email).first()
    
    if found:
        return jsonify({"status": "fail", "message": "Email already in use"}), 422

    user = User()
    user.email = email
    user.password = generate_password_hash(password)
    user.save()

    if user:
        return jsonify({ "status": "success", "message": "Succesful registration, please log in"}), 200
    
    return jsonify({"status":"fail", "message": "Please try again later"}), 400

@api.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email:
        return jsonify({"status": "fail", "message": "Email is required"}), 422
    
    if not password:
        return jsonify({"status": "fail", "message": "Password is required"}), 422

    found = User.query.filter_by(email=email).first()

    if not found:
        return jsonify({"status": "fail", "message": "Incorrect credentials"}), 401

    if not check_password_hash(found.password, password):
        return jsonify({"status": "fail", "message": "Incorrect credentials"}), 401
    
    data= {
        "id": found.id,
        "email": found.email,
    }

    access_token = create_access_token(identity=data)
    return jsonify({ "status": "success", "message": "Login successfully", "access_token": access_token, "user": found.serialize()}), 200

@api.route('/private', methods=['GET'])
@jwt_required() # Definir la ruta como privada
def private():

    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user["id"]).first()
    
    return jsonify({"user": user.serialize()}), 200




@api.route('/people', methods=['GET'])
def get_people():

    people = People.query.all()
    people =list(map(lambda people: people.serialize(), people))

    return jsonify(people), 200

@api.route('/people/<int:people_id>', methods=['GET'])
def get_person(people_id):

    person = People.query.get(people_id)
    
    return jsonify(person.serialize()), 200

@api.route('/planets', methods=['GET'])
def get_planets():

    planets = Planet.query.all()
    planets =list(map(lambda planet: planet.serialize(), planets))

    return jsonify(planets), 200

@api.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):

    planet = Planet.query.get(planet_id)
    
    return jsonify(planet.serialize()), 200

@api.route('/users', methods=['GET'])
def get_user():

    users = User.query.all()
    users =list(map(lambda user: user.serialize(), users))

    return jsonify(users), 200

@api.route('/users/favorites', methods=['GET'])
def get_user_favorites():

    user = User.query.get(1)
    favorite_people = favorite_people.query.filter_by(user_id=user.id)
    favorite_planet = favorite_planet.query.filter_by(user_id=user.id)

    favoritos = {
        "favorite_people": favorite_people.serialize(),
        "favorite_planet": favorite_planet.serialize(),
    }

    return jsonify(favoritos), 200


@api.route('/favorite/planet/<int:planet_id>', methods=['POST'])
def add_favorite_planet(planet_id):

    user= User.query.get(1)
    planet = Planet.query.get(planet_id)

    existing_favorite = FavoritePlanet.query.filter_by(user_id=user.id, planet_id=planet.id).first()
    if existing_favorite:
        return jsonify({"message": "Planet already in favorites."}), 400

    favorite = FavoritePlanet(user_id=user.id, planet_id= planet.id)

    db.session.add(favorite)
    db.session.commit()
    return jsonify(favorite.serialize()), 201


@api.route('/favorite/people/<int:people_id>', methods=['POST'])
def add_favorite_people(people_id):

    user= User.query.get(1)
    people = People.query.get(people_id)

    existing_favorite = FavoritePeople.query.filter_by(user_id=user.id, people_id=people.id).first()
    if existing_favorite:
        return jsonify({"message": "Person already in favorites."}), 400
    
    favorite = FavoritePeople(user_id=user.id, people_id= people.id)

    db.session.add(favorite)
    db.session.commit()
    return jsonify(favorite.serialize()), 201


@api.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
def delete_favorite_planet(planet_id):
    user= User.query.get(1)
    planet = Planet.query.get(planet_id)
    favorite = FavoritePlanet.query.filter_by(user_id=user.id, planet_id= planet.id).first()

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Favorite planet deleted."}), 200

@api.route('/favorite/people/<int:people_id>', methods=['DELETE'])
def delete_favorite_people(people_id):
    user= User.query.get(1)
    people = People.query.get(people_id)
    favorite = FavoritePeople.query.filter_by(user_id=user.id, people_id= people.id).first()

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Favorite person deleted."}), 200

