import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllModules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/module/')
      .then(res => res.json())
      .then(data => setModules(data))
      .catch(err => console.error('Error fetching modules:', err));
  }, []);

  return (
    <div>
      <h2>All Modules 📚</h2>

      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/modules/create">➕ Create New Module</Link>
      </nav>

      <ul>
        {modules.map((mod) => (
          <li key={mod.code}>
            <Link to={`/module/${mod.code}`}>{mod.code} - {mod.full_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllModules;
