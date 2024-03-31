import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ExperienceInput() {
  let [Experiences, setExperiences] = useState([]);
  let [ExperienceName, setExperienceName] = useState("");
  let [ExperienceDescription, setExperienceDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getExperiences", {
        params: {
          username: window.localStorage.getItem("username"),
        },
      })
      .then((res) => {
        setExperiences(res.data.repos);
        console.log(res.data.repos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addExperience = () => {
    let newExperience = {
      name: ExperienceName,
      readme: ExperienceDescription,
      selected: true,
    };

    axios
      .post("http://localhost:8000/updateExperiences", {
        username: window.localStorage.getItem("username"),
        repos: { ...Experiences, [ExperienceName]: newExperience },
      })
      .then((res) => {
        console.log(res.data);
        setExperiences(res.data.repos);
        setExperienceName("");
        setExperienceDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

// delteExperience function
    const deleteExperience = (Experience) => {
        axios
        .post("http://localhost:8000/deleteExperience", {
            username: window.localStorage.getItem("username"),
            Experience: Experience,
        })
        .then((res) => {
            console.log(res.data);
            setExperiences(res.data.repos);
        })
        .catch((err) => {
            console.log(err);
        });
    };

  const generate = () => {
    axios
      .post("http://localhost:8000/generatebullets", {
        username: window.localStorage.getItem("username"),
        repos: Experiences,
      })
      .then((res) => {
        console.log(res.data);
        window.location.href = "/Experiencebullets";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-8">
        <div className="flex flex-col p-8">
            <h1 className='text-3xl font-bold pb-4'>Add Experiences</h1>
            <input
                className='border-2 rounded-md p-2 mb-4'
                type="text"
                placeholder="Experience Name"
                value={ExperienceName}
                onChange={(e) => setExperienceName(e.target.value)}
            />
            <textarea
                className='h-64 border-2 rounded-md p-2 mb-4'
                placeholder="Experience Description"
                value={ExperienceDescription}
                onChange={(e) => setExperienceDescription(e.target.value)}
            />
            <button className='w-1/2 p-2 border-2 rounded-md mb-8' onClick={addExperience}>Add</button>
            <button className='w-1/2 p-2 border-2 rounded-md bg-black text-white' onClick={generate}>Generate Bullets</button>
        </div>
        <div className="flex justify-top items-top bg-gradient-to-r from-blue-100 to-green-200 rounded-xl border-4 border-slate-500">
            <div className="flex justify-top w-full">
                <ul className="w-full p-8">
                    <h1 className='text-3xl font-bold pb-4'>Current Experiences</h1>
                    {Object.values(Experiences).map((Experience, index) => (
                        <li className="flex justify-between w-full border-2 border-slate-500 bg-white rounded-md p-2 m-2">
                            <span>{index + 1}: {Experience.name}</span>
                            <span>Delete</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  );
}
