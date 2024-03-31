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
    let newProject = {
      name: projectName,
      readme: projectDescription,
      selected: true,
    };

    axios
      .post("http://localhost:8000/updateprojects", {
        username: window.localStorage.getItem("username"),
        repos: { ...projects, [projectName]: newProject },
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
    axios
      .post("http://localhost:8000/generatebullets", {
        username: window.localStorage.getItem("username"),
        repos: projects,
      })
      .then((res) => {
        console.log(res.data);
        window.location.href = "/projectbullets";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {Object.values(projects).map((project, index) => (
          <CardElement
            key={index}
            project={project}
            setProjects={setProjects}
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
        <br />
        <button onClick={generate}>Generate Bullets</button>
      </div>
    </>
  );
}
