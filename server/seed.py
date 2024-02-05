from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, Restaurant, Pizza, RestaurantPizza
import json
from random import choice


fake = Faker()

with app.app_context():
    print("Deleting all records...")

    db.session.query(RestaurantPizza).delete()
    db.session.commit()

    # Delete Pizza records (since RestaurantPizza records have been deleted)
    db.session.query(Pizza).delete()
    db.session.commit()

    # Delete Restaurant records (since no foreign keys are set, this should work)
    db.session.query(Restaurant).delete()
    db.session.commit()

    print("Creating Restaurants ...")
 
    restaurants = []
    for _ in range(20):
        restaurant_one = Restaurant(
            name=fake.company(), 
            address=fake.address()
        )
        
        restaurants.append(restaurant_one)

    db.session.add_all(restaurants)
    db.session.commit()

    print("Creating Pizzas ...")

    with open('pizza.txt', 'r') as file:
        pizza_data = json.load(file)
    
    for pizza_info in pizza_data:
        pizza = Pizza(name=pizza_info['name'], ingredients=pizza_info['ingredients'])

        db.session.add(pizza)


    db.session.commit()



    

    print("Creating Restaurant Pizzas ...")
    for restaurant in restaurants:
        num_pizzas = randint(1, 5)

        pizzas_for_restaurant = [choice(pizza_data) for _ in range(num_pizzas)]

        for pizza_info in pizzas_for_restaurant:

            pizza = db.session.query(Pizza).filter_by(name=pizza_info['name']).first()
            

            if pizza:
                restaurant_pizza = RestaurantPizza(
                    price=randint(1, 30),
                    restaurant_id=restaurant.id,
                    pizza_id=pizza.id
                )
                db.session.add(restaurant_pizza)

            else:
                print(f"Error: Pizza {pizza_info['name']} not found")

    db.session.commit()


    print("Seeding Successful ...")