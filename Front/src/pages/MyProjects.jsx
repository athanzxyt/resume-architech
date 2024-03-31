import React, { useState, useEffect } from "react";
import CardElement from "../components/CardElement";
import axios from "axios";
import ProjectAccordion from "../components/ProjectAccordion";

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

// delteProject function
    const deleteProject = (project) => {
        axios
        .post("http://localhost:8000/deleteproject", {
            username: window.localStorage.getItem("username"),
            project: project,
        })
        .then((res) => {
            console.log(res.data);
            setProjects(res.data.repos);
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
    <div className="grid grid-cols-2 gap-4 p-8">
        <div className="flex flex-col p-8">
            <h1 className='text-3xl font-bold pb-4'>Add Additional Projects</h1>
            <input
                className='border-2 rounded-md p-2 mb-4'
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
            <textarea
                className='h-64 border-2 rounded-md p-2 mb-4'
                placeholder="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
            />
            <button className='w-1/2 p-2 border-2 rounded-md mb-8' onClick={addProject}>Add</button>
            <button className='w-1/2 p-2 border-2 rounded-md bg-black text-white' onClick={generate}>Generate Bullets</button>
        </div>
        <div className="flex justify-center items-center">
            <div className="flex justify-center w-full">
                <ul className="w-full p-8">
                    <h1 className='text-3xl font-bold pb-4'>Current Projects</h1>
                    {Object.values(projects).map((project, index) => (
                        <li className="flex justify-between w-full border-2 rounded-md p-2 m-2">
                            <span>{index + 1}: {project.name}</span>
                            <span>Delete</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  );
}
