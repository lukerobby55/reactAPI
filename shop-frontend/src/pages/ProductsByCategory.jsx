import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductsByCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/?category=${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Products in Category: <code>{category}</code></h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((prod) => (
            <li key={prod.id}>
              <strong>{prod.name}</strong> — €
              {parseFloat(prod.price).toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
