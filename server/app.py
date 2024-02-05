from flask import Flask, make_response
from flask_migrate import Migrate
from flask import  jsonify, request
from models import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import validates 
from flask import Flask, request, jsonify, abort
from flask_migrate import Migrate
from models import db, Restaurant, Pizza, RestaurantPizza


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/Home')
def home():
    return '<h2>Flask app for Restaurants</h2>'

@app.route('/restaurants')
def get_restaurants():
    restaurants = Restaurant.query.all()
    restaurant_list = []
    for restaurant in restaurants:
        restaurant_info = {
            'id': restaurant.id,
            'name': restaurant.name,
            'address': restaurant.address
        }
        restaurant_list.append(restaurant_info)
    return jsonify(restaurant_list)

@app.route('/restaurants/<int:id>')
def get_restaurant(id):
    restaurant = Restaurant.query.filter_by(id=id).first()  # Check if restaurant exists(id)
    if restaurant is None:
        return jsonify({'error': 'Restaurant not found'}), 404
    
    restaurant_info = {
        'id': restaurant.id,
        'name': restaurant.name,
        'address': restaurant.address,
        'pizzas': []
    }
    for restaurant_pizza in restaurant.restaurant_pizzas:
        pizza_info = {
            'id': restaurant_pizza.pizza.id,
            'name': restaurant_pizza.pizza.name,
            'ingredients': restaurant_pizza.pizza.ingredients
        }
        restaurant_info['pizzas'].append(pizza_info)
    
    return jsonify(restaurant_info)

@app.route('/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if restaurant is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    # Delete associated RestaurantPizza entries
    RestaurantPizza.query.filter_by(restaurant_id=id).delete()

    # Delete the restaurant
    db.session.delete(restaurant)
    db.session.commit()

    return '', 204

@app.route('/pizzas')
def get_pizzas():
    pizzas = Pizza.query.all()
    pizza_list = []
    for pizza in pizzas:
        pizza_info = {
            'id': pizza.id,
            'name': pizza.name,
            'ingredients': pizza.ingredients
        }
        pizza_list.append(pizza_info)
    return jsonify(pizza_list)

@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizza():
    data = request.json
    print(data)  # Add this line to print the received JSON data

    if not all(key in data for key in ['price', 'pizza_id', 'restaurant_id']):
        return jsonify({'errors': ['validation errors']}), 400

    pizza_id = data['pizza_id']
    restaurant_id = data['restaurant_id']

    pizza = Pizza.query.filter_by(id=pizza_id).first()  # Check if pizza exists in the database(pizza_id)  # Check if pizza exists in the database(pizza_id)
    if pizza is None:
        return jsonify({'error': 'Pizza not found'}), 404

    restaurant = Restaurant.query.filter_by(id=restaurant_id).first()
    if restaurant is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    restaurant_pizza = RestaurantPizza(
        pizza_id=pizza_id,
        restaurant_id=restaurant_id,
        price=data['price']
    )


    db.session.add(restaurant_pizza)
    db.session.commit()

    return jsonify({
        'id': restaurant_pizza.id,
        'price': restaurant_pizza.price,
        'pizza_id': restaurant_pizza.pizza_id,
        'restaurant_id': restaurant_pizza.restaurant_id
    }), 201

if __name__ == '__main__':
    app.run(port=5501, debug=True)
