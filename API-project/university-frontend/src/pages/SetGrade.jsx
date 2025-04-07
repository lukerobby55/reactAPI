import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SetGrade() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [studentCohort, setStudentCohort] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [caMark, setCaMark] = useState('');
  const [examMark, setExamMark] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/student/')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Error fetching students:', err));
  }, []);

  useEffect(() => {
    if (!selectedStudent) return;

    fetch(`http://127.0.0.1:8000/api/student/${selectedStudent}/`)
      .then((res) => res.json())
      .then((data) => {
        const cohortUrl = data.cohort;
        setStudentCohort(cohortUrl);

        const cohortCode = cohortUrl.split('/').filter(Boolean).pop();
        fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortCode}`)
          .then((res) => res.json())
          .then((modulesData) => setModules(modulesData))
          .catch((err) => console.error('Error fetching modules:', err));
      })
      .catch((err) => console.error('Error fetching student:', err));
  }, [selectedStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedStudent || !selectedModule || caMark === '' || examMark === '') {
      alert('All fields are required.');
      return;
    }

    const grade = {
      student: `http://127.0.0.1:8000/api/student/${selectedStudent}/`,
      module: `http://127.0.0.1:8000/api/module/${selectedModule}/`,
      cohort: studentCohort,
      ca_mark: parseInt(caMark, 10),
      exam_mark: parseInt(examMark, 10),
    };

    fetch('http://127.0.0.1:8000/api/grade/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grade),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error response:', errorData);
          throw new Error('Failed to set grade');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Grade set:', data);
        navigate(`/student/${selectedStudent}`);
      })
      .catch((err) => console.error('Error setting grade:', err));
  };

  return (
    <div>
      <h2>Set Grade for Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Student:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
          >
            <option value="">-- Select Student --</option>
            {students.map((stu) => (
              <option key={stu.student_id} value={stu.student_id}>
                {stu.first_name} {stu.last_name} ({stu.student_id})
              </option>
            ))}
          </select>
        </div>

        {studentCohort && (
          <div>
            <label>Select Module:</label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              required
            >
              <option value="">-- Select Module --</option>
              {modules.map((mod) => (
                <option key={mod.code} value={mod.code}>
                  {mod.full_name} ({mod.code})
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label>CA Mark:</label>
          <input
            type="number"
            value={caMark}
            onChange={(e) => setCaMark(e.target.value)}
            min="0"
            max="100"
            required
          />
        </div>

        <div>
          <label>Exam Mark:</label>
          <input
            type="number"
            value={examMark}
            onChange={(e) => setExamMark(e.target.value)}
            min="0"
            max="100"
            required
          />
        </div>

        <button type="submit">Set Grade</button>
      </form>
    </div>
  );
}

export default SetGrade;
