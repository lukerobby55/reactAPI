import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateModule() {
  const [code, setCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [caSplit, setCaSplit] = useState('');
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohorts, setSelectedCohorts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/')
      .then(res => res.json())
      .then(data => setCohorts(data))
      .catch(err => console.error('Error fetching cohorts:', err));
  }, []);

  const handleCohortChange = (e) => {
    const cohortUrl = e.target.value;
    if (e.target.checked) {
      setSelectedCohorts([...selectedCohorts, cohortUrl]);
    } else {
      setSelectedCohorts(selectedCohorts.filter(url => url !== cohortUrl));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const moduleData = {
      code,
      full_name: fullName,
      ca_split: parseInt(caSplit),
      delivered_to: selectedCohorts,
    };

    const response = await fetch('http://127.0.0.1:8000/api/module/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moduleData),
    });

    if (response.ok) {
      navigate('/modules');
    } else {
      console.error('Error creating module:', await response.text());
      alert('Failed to create module.');
    }
  };

  return (
    <div>
      <h2>Create a New Module 📘</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Module Code:
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          CA Split (%):
          <input
            type="number"
            value={caSplit}
            onChange={(e) => setCaSplit(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>Delivered To Cohorts:</label>
        <br />
        {cohorts.map(cohort => (
          <div key={cohort.id}>
            <input
              type="checkbox"
              value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}
              onChange={handleCohortChange}
            />
            {cohort.name} ({cohort.id})
          </div>
        ))}
        <br />
        <button type="submit">Create Module</button>
      </form>
    </div>
  );
}

export default CreateModule;
