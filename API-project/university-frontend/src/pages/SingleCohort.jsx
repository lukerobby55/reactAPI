import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function SingleCohort() {
  const { pk } = useParams();
  const [students, setStudents] = useState([]);
  const [cohort, setCohort] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cohort/${pk}/`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched cohort:', data);
        setCohort(data);
      })
      .catch(err => console.error('Error fetching cohort:', err));

    fetch(`http://127.0.0.1:8000/api/student/?cohort=${pk}`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched students:', data);
        setStudents(data);
      })
      .catch(err => console.error('Error fetching students:', err));
  }, [pk]);

  return (
    <div>
      <h2>Cohort: {pk}</h2>
      {cohort && <p><strong>{cohort.name}</strong></p>}

      <h3>Students</h3>
      {students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student.student_id}>
              <Link to={`/student/${student.student_id}`}>
                {student.first_name} {student.last_name}
              </Link>{' '}
              – {student.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found.</p>
      )}

      <br />
      <Link to={`/cohort/${pk}/modules`}>
        View Modules Delivered to this Cohort
      </Link>
    </div>
  );
}

export default SingleCohort;
