from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import validates 

db = SQLAlchemy()

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(Integer, primary_key=True)
    name = db.Column(String)
    address = db.Column(String)

    restaurant_pizzas = db.relationship('RestaurantPizza',  back_populates='restaurant')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise AssertionError('Name cannot be empty')
        return name

    def __init__(self, name, address, pizzas):
        self.name = name
        self.address = address

class Pizza(db.Model):
    __tablename__ = 'pizzas'

    id = db.Column(Integer, primary_key=True)
    name = db.Column(String)
    ingredients = db.Column(String)

    restaurant_pizzas = db.relationship('RestaurantPizza', back_populates='pizza')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise AssertionError('Name cannot be empty')
        return name

    def __init__(self, name, ingredients):
        self.name = name
        self.ingredients = ingredients

class RestaurantPizza(db.Model):
    __tablename__ = 'restaurant_pizzas'

    id = db.Column(Integer, primary_key=True)
    price = db.Column(Integer)
    restaurant_id = db.Column(Integer, db.ForeignKey('restaurants.id'))
    pizza_id = db.Column(Integer, db.ForeignKey('pizzas.id'))

    restaurant = db.relationship('Restaurant',  back_populates='restaurant_pizzas')
    pizza = db.relationship('Pizza',  back_populates='restaurant_pizzas')

    @validates('price')
    def validate_price(self, key, price):
        if not 1 <= price <= 30:
            raise ValueError('Price must be between 1 and 30.')
        return price

    def __init__(self, restaurant_id, pizza_id, price):
        self.restaurant_id = restaurant_id
        self.pizza_id = pizza_id
        self.price = price