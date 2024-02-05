import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PizzaForm from "./PizzaForm";

function Home() {
  const [{ data: restaurant, error, status }, setRestaurant] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`/restaurants/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((restaurant) =>
          setRestaurant({ data: restaurant, error: null, status: "resolved" })
        );
      } else {
        r.json().then((err) =>
          setRestaurant({ data: null, error: err.error, status: "rejected" })
        );
      }
    });
  }, [id]);

  function handleAddPizza(newPizza) {
    setRestaurant({
      data: {
        ...restaurant,
        pizzas: [...restaurant.pizzas, newPizza],
      },
      error: null,
      status: "resolved",
    });
  }

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "rejected") return <h1>Error: {error.error}</h1>;

  return (
    <section style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headerStyle}>{restaurant.name}</h1>
        <p>{restaurant.address}</p>
      </div>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Pizza Menu</h2>
        {restaurant.pizzas.map((pizza) => (
          <div key={pizza.id} style={pizzaStyle}>
            <h3>{pizza.name}</h3>
            <p>
              <em>{pizza.ingredients}</em>
            </p>
          </div>
        ))}
      </div>
      <div style={cardStyle}>
        <h3 style={headerStyle}>Add New Pizza</h3>
        <PizzaForm restaurantId={restaurant.id} onAddPizza={handleAddPizza} />
      </div>
    </section>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const cardStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  margin: "10px",
  width: "300px",
};

const headerStyle = {
  marginBottom: "15px",
  color: "#333",
};

const pizzaStyle = {
  marginBottom: "15px",
};

export default Home;