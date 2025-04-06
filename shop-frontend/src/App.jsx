import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsByCategory from './pages/ProductsByCategory';
import OrdersByStatus from './pages/OrdersByStatus';
import CustomerDetails from './pages/CustomerDetails';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductsByCategory />} />
        <Route path="/orders/:status" element={<OrdersByStatus />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
