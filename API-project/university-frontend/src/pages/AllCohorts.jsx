import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllCohorts() {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/')
      .then(res => res.json())
      .then(data => setCohorts(data))
      .catch(err => console.error('Error fetching cohorts:', err));
  }, []);

  return (
    <div>
      <h2>All Cohorts 👥</h2>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/cohort/create">+ Add New Cohort</Link>
      </div>
      <ul>
        {cohorts.map((cohort) => (
          <li key={cohort.id}>
            <Link to={`/cohort/${cohort.id}`}>{cohort.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllCohorts;
