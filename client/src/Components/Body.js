import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("/restaurants")
      .then((r) => r.json())
      .then(setRestaurants);
  }, []);

  function handleDelete(id) {
    fetch(`/restaurants/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setRestaurants((restaurants) =>
          restaurants.filter((restaurant) => restaurant.id !== id)
        );
      }
    });
  }

  const cardStyle = {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "300px",
    marginBottom: "20px",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
    textDecoration: "none",
    color: "#333",
    display: "flex",
    flexDirection: "column",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const deleteButtonStyle = {
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    padding: "8px",
    cursor: "pointer",
    borderRadius: "4px",
    marginTop: "auto", // Push the button to the bottom
  };

  const deleteButtonHoverStyle = {
    backgroundColor: "#c9302c",
  };

  return (
    <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} style={cardStyle}>
          <h2 style={linkStyle}>
            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
          </h2>
          <p style={{ color: "#555", marginBottom: "10px" }}>
            Address: {restaurant.address}
          </p>
          <button
            onClick={() => handleDelete(restaurant.id)}
            style={{ ...deleteButtonStyle, ...deleteButtonHoverStyle }}
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}

export default Home;