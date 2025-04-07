import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateCohort() {
  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/degree/")
      .then((res) => res.json())
      .then((data) => setDegrees(data))
      .catch((err) => console.error("Error fetching degrees:", err));
  }, []);

  const generateId = (shortcode, year) => {
    return `${shortcode}${year}`;
  };

  const generateName = (year, degreeName) => {
    const yearText = ["1st", "2nd", "3rd", "4th"][year - 1] || `${year}th`;
    return `${yearText} year ${degreeName}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDegreeObj = degrees.find((deg) => deg.shortcode === selectedDegree);
    if (!selectedDegreeObj) {
      alert("Invalid degree selected.");
      return;
    }

    const generatedId = generateId(selectedDegree, year);
    const generatedName = generateName(parseInt(year), selectedDegreeObj.full_name);

    const cohortData = {
      id: generatedId,
      year: parseInt(year),
      degree: `http://127.0.0.1:8000/api/degree/${selectedDegree}/`,
      name: generatedName,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/cohort/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cohortData),
      });

      if (!response.ok) {
        throw new Error("Failed to create cohort");
      }

      const data = await response.json();
      console.log("Created cohort:", data);
      navigate("/cohorts");
    } catch (err) {
      console.error("Error creating cohort:", err);
    }
  };

  return (
    <div>
      <h2>Create a New Cohort</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Degree:
          <select value={selectedDegree} onChange={(e) => setSelectedDegree(e.target.value)} required>
            <option value="">-- Select Degree --</option>
            {degrees.map((degree) => (
              <option key={degree.shortcode} value={degree.shortcode}>
                {degree.full_name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <label>
          Year:
          <select value={year} onChange={(e) => setYear(e.target.value)} required>
            <option value="">-- Select Year --</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
          </select>
        </label>
        <br />
        <br />
        <button type="submit">Create Cohort</button>
      </form>
    </div>
  );
}

export default CreateCohort;
