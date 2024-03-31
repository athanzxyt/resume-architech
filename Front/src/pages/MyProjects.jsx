import React, { useState, useEffect } from "react";
import CardElement from "../components/CardElement";
import axios from "axios";

export default function MyProjects() {
  let [projects, setProjects] = useState([]);
  let [projectName, setProjectName] = useState("");
  let [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getprojects", {
        params: {
          username: window.localStorage.getItem("username"),
        },
      })
      .then((res) => {
        setProjects(res.data.repos);
        console.log(res.data.repos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addProject = () => {
    axios
      .post("http://localhost:8000/addproject", {
        username: window.localStorage.getItem("username"),
        project: {
          name: projectName,
          readme: projectDescription,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProjects(res.data.repos);
        setProjectName("");
        setProjectDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generate = () => {
    console.log("generating");
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {Object.values(projects).map((project, index) => (
          <CardElement
            key={index}
            project={project}
            barContent={`Project ${index + 1}: ${project.name}`}
          />
        ))}
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <br />
        <button onClick={addProject}>add</button>
        <button onClick={generate}>Generate Bullets</button>
      </div>
    </>
  );
}
