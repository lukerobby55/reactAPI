import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cohort, setCohort] = useState('');
  const [cohorts, setCohorts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/')
      .then((res) => res.json())
      .then((data) => setCohorts(data))
      .catch((err) => console.error('Error fetching cohorts:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      student_id: studentId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/api/student/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });

      if (!res.ok) throw new Error('Failed to create student');

      const created = await res.json();
      const studentPk = created.student_id;
      navigate(`/student/${studentPk}`);
    } catch (err) {
      console.error('Error creating student:', err);
    }
  };

  return (
    <div>
      <h2>Create a New Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Student ID:</label><br />
        <input value={studentId} onChange={(e) => setStudentId(e.target.value)} required /><br />

        <label>First Name:</label><br />
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required /><br />

        <label>Last Name:</label><br />
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} required /><br />

        <label>Email:</label><br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

        <label>Cohort:</label><br />
        <select value={cohort} onChange={(e) => setCohort(e.target.value)} required>
          <option value="">-- Select Cohort --</option>
          {cohorts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select><br /><br />

        <button type="submit">Create Student</button>
      </form>
    </div>
  );
}

export default CreateStudent;
