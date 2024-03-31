import React from "react";
import { Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage.jsx";
import Landing from "./pages/Landing.jsx";
import PersonalInfo from "./pages/PersonalInfo.jsx";
import JobInfo from "./pages/JobInfo.jsx";
import FinalizeResume from "./pages/FinalizeResume.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import MyProjects from "./pages/MyProjects.jsx";

export default function App() {
  let authenticated = localStorage.getItem("username") ? true : false;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/personal-info"
          element={
            <PR>
              <PersonalInfo />
            </PR>
          }
        />
        <Route
          path="/myprojects"
          element={
            <PR>
              <MyProjects />
            </PR>
          }
        />
        <Route path="/job-info" element={<JobInfo />} />
        <Route path="/finalize-resume" element={<FinalizeResume />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

function PR(props) {
  if (localStorage.getItem("username")) {
    return props.children;
  } else {
    window.location.href = "/";
    return null;
  }
}
