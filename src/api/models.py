from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, default=True)

    favorite_people = db.relationship('FavoritePeople', backref='user')
    favorite_planets = db.relationship('FavoritePlanet', backref='user')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active
        }
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class People(db.Model):
    __tablename__ = 'people'
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)

    favorite_people = db.relationship('FavoritePeople', backref='people')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }

class Planet(db.Model):
    __tablename__ = 'planets'
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)

    favorite_planet = db.relationship('FavoritePlanet', backref='planets')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }

class FavoritePeople(db.Model):
    __tablename__ = 'favorites_people'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) 
    people_id = db.Column(db.Integer, db.ForeignKey('people.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "people": self.people_id
        }


class FavoritePlanet(db.Model):
    __tablename__ = 'favorites_planets'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "planet": self.planet_id
        }


    def __repr__(self):
        return '<User %r>' % self.username
