import { Link, Outlet } from "react-router-dom";
import "../index.css";

function Layout() {
  return (
    <>
      <style>{`
        .navbar {
          background: rgba(0, 51, 153, 0.9);
          border-bottom: 3px solid rgba(255, 215, 0, 0.7); 
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px); 
          padding: 12px 5px;
          z-index: 100;
          position: sticky;
          top: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar h1 {
          font-family: 'Georgia', serif;
          font-size: 22px;
          font-weight: bold;
          color: #FFD700;
          margin: 0;
          text-shadow: 1px 1px 2px black;
        }

        .nav-links {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .nav-links a {
          font-family: 'Verdana', sans-serif;
          font-size: 13.5px;
          font-weight: bold;
          color: #FFD700;
          text-decoration: none;
          padding: 6px 10px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .nav-links a:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .main-content {
          padding: 1.5rem;
        }

        @media (max-width: 900px) {
          .nav-links {
            justify-content: flex-end;
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="navbar">
        <h1>DCU University Portal</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/degrees">Degrees</Link>
          <Link to="/cohorts">Cohorts</Link>
          <Link to="/modules">Modules</Link>
          <Link to="/degrees/create">Create Degree</Link>
          <Link to="/cohort/create">New Cohort</Link>
          <Link to="/modules/create">New Module</Link>
          <Link to="/student/create">New Student</Link>
          <Link to="/set-grade">Set Grade</Link>
        </div>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
