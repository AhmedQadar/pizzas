import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const PizzaForm = ({ restaurantId, onAddPizza }) => {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaId, setPizzaId] = useState("");
  const [price, setPrice] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    fetch("/pizzas")
      .then((r) => r.json())
      .then(setPizzas);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      pizza_id: pizzaId,
      restaurant_id: restaurantId,
      price: parseInt(price),
    };

    try {
      const response = await fetch("/restaurant_pizzas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPizza = await response.json();
        onAddPizza(newPizza);
        setFormErrors([]);
      } else {
        const err = await response.json();
        toast.error(err.errors[0]);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label htmlFor="pizza_id" style={labelStyle}>
        Pizza:
      </label>
      <select
        id="pizza_id"
        name="pizza_id"
        value={pizzaId}
        onChange={(e) => setPizzaId(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select a pizza</option>
        {pizzas.map((pizza) => (
          <option key={pizza.id} value={pizza.id}>
            {pizza.name}
          </option>
        ))}
      </select>
      <label htmlFor="price" style={labelStyle}>
        Price:
      </label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={inputStyle}
      />
      {formErrors.length > 0 && (
        <div style={errorContainerStyle}>
          {formErrors.map((err, index) => (
            <p key={index} style={errorTextStyle}>
              {err}
            </p>
          ))}
        </div>
      )}
      <button type="submit" style={buttonStyle}>
        Add To Restaurant
      </button>
    </form>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "300px",
  margin: "auto",
};

const labelStyle = {
  marginBottom: "5px",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "8px",
  marginBottom: "10px",
};

const errorContainerStyle = {
  margin: "10px 0",
};

const errorTextStyle = {
  color: "red",
};

const buttonStyle = {
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  padding: "10px",
  cursor: "pointer",
};

export default PizzaForm;