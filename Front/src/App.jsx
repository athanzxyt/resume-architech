import React from "react";
import { Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage.jsx";
import Landing from "./pages/Landing.jsx";
import PersonalInfo from "./pages/PersonalInfo.jsx";
import JobInfo from "./pages/JobInfo.jsx";
import FinalizeResume from "./pages/FinalizeResume.jsx";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/job-info" element={<JobInfo />} />
        <Route path="/finalize-resume" element={<FinalizeResume />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}
