import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Degrees from "./pages/Degrees";
import CreateDegree from "./pages/CreateDegree";
import SingleDegree from "./pages/SingleDegree";
import AllCohorts from "./pages/AllCohorts";
import CreateCohort from "./pages/CreateCohort";
import SingleCohort from "./pages/SingleCohort";
import AllModules from "./pages/AllModules";
import SingleModule from "./pages/SingleModule";
import CreateModule from "./pages/CreateModule";
import CreateStudent from "./pages/CreateStudent";
import SingleStudent from "./pages/SingleStudent";
import SetGrade from "./pages/SetGrade";
import CohortModules from "./pages/CohortModules";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/degrees" element={<Degrees />} />
          <Route path="/degrees/create" element={<CreateDegree />} />
          <Route path="/degree/:shortcode" element={<SingleDegree />} />
          <Route path="/cohorts" element={<AllCohorts />} />
          <Route path="/cohort/create" element={<CreateCohort />} />
          <Route path="/cohort/:pk" element={<SingleCohort />} />
          <Route path="/cohort/:cohortId/modules" element={<CohortModules />} />
          <Route path="/modules" element={<AllModules />} />
          <Route path="/module/:code" element={<SingleModule />} />
          <Route path="/modules/create" element={<CreateModule />} />
          <Route path="/student/create" element={<CreateStudent />} />
          <Route path="/student/:id" element={<SingleStudent />} />
          <Route path="/set-grade" element={<SetGrade />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
