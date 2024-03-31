import React, { useState, useEffect } from "react";
import axios from "axios";
import "./form1.css";

export default function form3() {
  let [experiences, setExperiences] = useState([]);
  let [experienceName, setExperienceName] = useState("");
  let [experienceDescription, setExperienceDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getuser", {
        params: {
          username: window.localStorage.getItem("username"),
        },
      })
      .then((res) => {
        setExperiences(res.data.experiences ?? {});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addExperience = () => {
    let newExperience = {
      name: experienceName,
      readme: experienceDescription,
      selected: true,
    };

    axios
      .post("http://localhost:8000/updateexperience", {
        username: window.localStorage.getItem("username"),
        experiences: { ...experiences, [experienceName]: newExperience },
      })
      .then((res) => {
        console.log(res.data);
        setExperiences(res.data.experiences ?? {});
        setExperienceName("");
        setExperienceDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delteExperience function
  const deleteExperience = (experience) => {
    let newExperiences = { ...experiences };
    delete newExperiences[experience];
    axios
      .post("http://localhost:8000/updateexperience", {
        username: window.localStorage.getItem("username"),
        experiences: newExperiences,
      })
      .then((res) => {
        console.log(res.data);
        setExperiences(res.data.experiences);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-screen">
        <div className="grid grid-cols-2 gap-4 p-8">
        <div className="flex flex-col p-8 w-full">
            <h1 className='text-3xl font-bold pb-4 '>Add Experiences</h1>
            <input
                className='w-full border-2 rounded-md p-2 mb-4'
                type="text"
                placeholder="Experience Name"
                value={experienceName}
                onChange={(e) => setExperienceName(e.target.value)}
            />
            <textarea
                className='h-64 border-2 rounded-md p-2 mb-4'
                placeholder="Experience Description"
                value={experienceDescription}
                onChange={(e) => setExperienceDescription(e.target.value)}
            />
            <button className='w-1/2 p-2 border-2 rounded-md mb-8' onClick={addExperience}>Add</button>
        </div>
        <div className="flex justify-top items-top bg-gradient-to-r from-blue-100 to-green-200 rounded-xl border-4 border-slate-500">
          <div className="flex justify-top w-full">
            <ul className="w-full p-8">
              <h1 className="text-3xl font-bold pb-4">Current Experiences</h1>
              {Object.values(experiences).map((Experience, index) => (
                <li className="flex justify-between w-full border-2 border-slate-500 bg-white rounded-md p-2 m-2">
                  <span>
                    {index + 1}: {Experience.name}
                  </span>
                  <span>Delete</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
