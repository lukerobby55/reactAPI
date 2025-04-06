import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/order/${id}/`)
      .then(res => setOrder(res.data));

    axios.get(`http://127.0.0.1:8000/api/orderitem/?order=${id}`)
      .then(async res => {
        const fetchedItems = res.data;
        setItems(fetchedItems);

        const productData = {};
        let sum = 0;

        await Promise.all(
          fetchedItems.map(async item => {
            const prodRes = await axios.get(item.product);
            const product = prodRes.data;
            productData[item.product] = product;
            sum += parseFloat(product.price) * item.quantity;
          })
        );

        setProducts(productData);
        setTotal(sum);
      });
  }, [id]);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div>
      <h2>Order #{id}</h2>
      <p>Shipping Address: {order.shipping_addr}</p>
      <p>Status: {order.status}</p>
      <p>Date Ordered: {new Date(order.date_ordered).toLocaleString()}</p>

      <h3>Items</h3>
      <ul>
        {items.map(item => {
          const product = products[item.product];
          return (
            <li key={item.url}>
              {product?.name} - €{parseFloat(product?.price).toFixed(2)} x {item.quantity}
            </li>
          );
        })}
      </ul>
      <h4>Total: €{total.toFixed(2)}</h4>
    </div>
  );
}
