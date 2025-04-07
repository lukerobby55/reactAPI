import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Degrees() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(res => res.json())
      .then(data => setDegrees(data))
      .catch(err => console.error('Error fetching degrees:', err));
  }, []);

  return (
    <div>
      <h2>All Degrees 🎓</h2>
      <ul>
        {degrees.map((degree) => (
          <li key={degree.shortcode}>
            <Link to={`/degree/${degree.shortcode}`}>
              <strong>{degree.full_name}</strong> ({degree.shortcode})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Degrees;
