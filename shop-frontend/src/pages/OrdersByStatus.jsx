import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function OrdersByStatus() {
  const { status } = useParams();
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/order/?status=${status}`)
      .then((res) => {
        setOrders(res.data);

        const customerUrls = [...new Set(res.data.map(order => order.customer))];

        Promise.all(customerUrls.map(url => axios.get(url)))
          .then((responses) => {
            const customerMap = {};
            responses.forEach((res) => {
              customerMap[res.config.url] = res.data;
            });
            setCustomers(customerMap);
          })
          .catch((err) => console.error("Customer fetch error", err));
      })
      .catch((err) => console.error("Order fetch error", err));
  }, [status]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Orders with Status: <code>{status}</code></h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => {
            const customer = customers[order.customer];
            return (
              <li key={order.id} style={{ marginBottom: "1rem" }}>
                <strong>Order #{order.url.split("/").filter(Boolean).pop()}</strong><br />
                Date: {new Date(order.date_ordered).toLocaleDateString()}<br />
                Customer: {customer ? `${customer.name} (${customer.email})` : order.customer}<br />
                Shipping: {order.shipping_addr}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
