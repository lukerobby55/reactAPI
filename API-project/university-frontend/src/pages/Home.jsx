function Home() {
  return (
    <div className="home">
      <section className="section portal-preview">
        <h2>University Portal Features</h2>
        <div className="portal-grid">
          <div className="portal-card">
            <h3>Degrees</h3>
            <p>View and create university degrees.</p>
          </div>
          <div className="portal-card">
            <h3>Cohorts</h3>
            <p>View and create university cohorts.</p>
          </div>
          <div className="portal-card">
            <h3>Modules</h3>
            <p>View, Create, and Assign modules to cohorts.</p>
          </div>
          <div className="portal-card">
            <h3>Grades</h3>
            <p>Input and review student marks in various modules.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
