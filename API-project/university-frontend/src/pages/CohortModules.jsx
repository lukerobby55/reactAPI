import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CohortModules() {
  const { cohortId } = useParams();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched modules for cohort:", data);
        setModules(data);
      })
      .catch((err) => console.error("Error fetching modules:", err));
  }, [cohortId]);

  return (
    <div>
      <h2>Modules delivered to Cohort: {cohortId}</h2>
      <ul>
        {modules.map((mod) => (
          <li key={mod.code}>
            <strong>{mod.code}</strong>: {mod.full_name} (CA Split: {mod.ca_split}%)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CohortModules;
