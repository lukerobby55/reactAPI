import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [statuses] = useState(['O', 'P', 'S', 'D']);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/category/').then(res => setCategories(res.data));
    axios.get('http://127.0.0.1:8000/api/customer/').then(res => setCustomers(res.data));
    axios.get('http://127.0.0.1:8000/api/order/').then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h1>Shop React API</h1>

      <h2>View Products by Category</h2>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select category</option>
        {categories.map(cat => (
          <option key={cat.shortcode} value={cat.shortcode}>
            {cat.display_name}
          </option>
        ))}
      </select>
      <button onClick={() => selectedCategory && navigate(`/products/${selectedCategory}`)}>Go</button>

      <h2>View Orders by Status</h2>
      <select onChange={(e) => setSelectedStatus(e.target.value)}>
        <option value="">Select status</option>
        {statuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <button onClick={() => selectedStatus && navigate(`/orders/${selectedStatus}`)}>Go</button>

      <h2>View Customer Details</h2>
      <select onChange={(e) => setSelectedCustomer(e.target.value)}>
        <option value="">Select customer</option>
        {customers.map(cust => (
          <option key={cust.url} value={cust.url.split('/').filter(Boolean).pop()}>
            {cust.name}
          </option>
        ))}
      </select>
      <button onClick={() => selectedCustomer && navigate(`/customer/${selectedCustomer}`)}>Go</button>

      <h2>View Order Details</h2>
      <select onChange={(e) => setSelectedOrder(e.target.value)}>
        <option value="">Select order</option>
        {orders.map(order => (
          <option key={order.url} value={order.url.split('/').filter(Boolean).pop()}>
            Order {order.url.split('/').filter(Boolean).pop()}
          </option>
        ))}
      </select>
      <button onClick={() => selectedOrder && navigate(`/order/${selectedOrder}`)}>Go</button>
    </div>
  );
}
