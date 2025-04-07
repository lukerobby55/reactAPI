import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function SingleDegree() {
  const { shortcode } = useParams();
  const [degree, setDegree] = useState(null);
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/degree/${shortcode}/`)
      .then(res => res.json())
      .then(data => setDegree(data))
      .catch(err => console.error('Error fetching degree:', err));

    fetch(`http://127.0.0.1:8000/api/cohort/?degree=${shortcode}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched cohorts:", data);
        setCohorts(data);
      })
      .catch(err => console.error('Error fetching cohorts:', err));
  }, [shortcode]);

  return (
    <div>
      <h2>Degree: {shortcode}</h2>
      {degree && <h3>{degree.full_name}</h3>}

      <h4>Cohorts:</h4>
      <ul>
        {cohorts.map((cohort) => {
          const cohortCode = cohort.id;

          return (
            <li key={cohortCode}>
              <Link to={`/cohort/${cohortCode}`}>
                {cohort.name || 'Unnamed Cohort'} ({cohortCode})
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SingleDegree;
