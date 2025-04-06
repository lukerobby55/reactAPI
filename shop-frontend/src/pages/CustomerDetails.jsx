import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/customer/${id}/`)
      .then(res => setCustomer(res.data))
      .catch(err => console.error("Error getting customer:", err));

    axios.get(`http://127.0.0.1:8000/api/order/?customer=${id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error getting orders:", err));
  }, [id]);

  const statusMap = {
    O: 'Ordered',
    P: 'Processing',
    S: 'Shipped',
    D: 'Delivered'
  };

  if (!customer) return <p>Loading customer details...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{customer.name}</h2>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Address:</strong> {customer.address}</p>

      <h3>Orders:</h3>
      {orders.length === 0 ? (
        <p>This customer has no orders.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.url} style={{ marginBottom: '1rem' }}>
              <strong>Order #{order.url.split('/').filter(Boolean).pop()}</strong><br />
              <strong>Date:</strong> {new Date(order.date_ordered).toLocaleDateString()}<br />
              <strong>Status:</strong> {statusMap[order.status] || order.status}<br />
              <strong>Shipping Address:</strong> {order.shipping_addr}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
