import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleModule() {
  const { code } = useParams();
  const [moduleData, setModuleData] = useState(null);
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    fetch(`http://127.0.0.1:8000/api/module/${code}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch module');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched module:', data);
        setModuleData(data);
      })
      .catch((err) => {
        console.error('Error fetching module:', err);
        setError('Module not found or failed to load.');
      });

    fetch(`http://127.0.0.1:8000/api/grade/?module=${code}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch grades');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched grades:', data);
        setGrades(data);
      })
      .catch((err) => {
        console.error('Error fetching grades:', err);
        setGrades([]);
      });
  }, [code]);

  if (!code) return <p>Invalid module code.</p>;
  if (error) return <p>{error}</p>;
  if (!moduleData) return <p>Loading module data...</p>;

  return (
    <div>
      <h2>Module: {moduleData.code}</h2>
      <h3>{moduleData.full_name}</h3>
      <p><strong>CA Split:</strong> {moduleData.ca_split}%</p>

      <h4>Delivered To:</h4>
      <ul>
        {moduleData.delivered_to?.map((url) => {
          const cohortCode = url.split('/').filter(Boolean).pop();
          return <li key={url}>{cohortCode}</li>;
        })}
      </ul>

      <h4>Students in this Module:</h4>
      <ul>
        {grades.length > 0 ? (
          grades.map((grade) => (
            <li key={grade.id}>
              Student ID: {grade.student.split('/').filter(Boolean).pop()} <br />
              CA Mark: {grade.ca_mark} <br />
              Exam Mark: {grade.exam_mark} <br />
              <strong>Total Grade:</strong> {grade.total_grade}
              <hr />
            </li>
          ))
        ) : (
          <p>No grades found for this module.</p>
        )}
      </ul>
    </div>
  );
}

export default SingleModule;
