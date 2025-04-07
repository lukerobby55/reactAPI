import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SingleStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/${id}/`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched student:", data);
        setStudent(data);
      })
      .catch(err => console.error("Error fetching student:", err));

    fetch(`http://127.0.0.1:8000/api/grade/?student=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched grades:", data);
        setGrades(data);
      })
      .catch(err => console.error("Error fetching grades:", err));
  }, [id]);

  return (
    <div>
      <h2>Student Details</h2>
      {student ? (
        <div>
          <p><strong>Name:</strong> {student.first_name} {student.last_name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>ID:</strong> {student.student_id}</p>

          <h3>Modules & Grades</h3>
          {grades.length > 0 ? (
            <ul>
              {grades.map((grade) => {
                const moduleCode = grade.module.split('/').filter(Boolean).pop();
                return (
                  <li key={`${grade.student}-${moduleCode}`} style={{ marginBottom: '1rem' }}>
                    <div><strong>Module:</strong> <Link to={`/module/${moduleCode}`}>{moduleCode}</Link></div>
                    <div><strong>CA Mark:</strong> {grade.ca_mark ?? 'N/A'}</div>
                    <div><strong>Exam Mark:</strong> {grade.exam_mark ?? 'N/A'}</div>
                    <div><strong>Total Grade:</strong> {grade.total_grade ?? 'N/A'}</div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No grades found.</p>
          )}
        </div>
      ) : (
        <p>Loading student info...</p>
      )}
    </div>
  );
}

export default SingleStudent;
