import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateDegree() {
  const [fullName, setFullName] = useState('');
  const [shortcode, setShortcode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/degree/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: fullName,
        shortcode: shortcode,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to create degree');
        }
        return res.json();
      })
      .then(() => {
        navigate('/degrees');
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('Failed to create degree');
      });
  };

  return (
    <div>
      <h2>Create a New Degree</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label><br />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Shortcode:</label><br />
          <input
            type="text"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Create Degree</button>
      </form>
    </div>
  );
}

export default CreateDegree;
