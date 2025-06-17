import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:8000/items").then(res => setItems(res.data));
  }, []);

  const addItem = () => {
    axios.post("http://localhost:8000/items", { name, quantity })
      .then(res => {
        setItems(prev => [...prev, res.data]);
        setName("");
        setQuantity(1);
      });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Inventory App</h1>
      <div>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input type="number" value={quantity} onChange={e => setQuantity(+e.target.value)} />
        <button onClick={addItem}>Add</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name} – {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
