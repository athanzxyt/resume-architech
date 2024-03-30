import React from "react";
import { useState } from "react";
import "./form1.css";
import axios from "axios";

function form3() {
  let [ghUsername, setGhUsername] = useState("");
  const submit = () => {
    axios
      .get(`http://localhost:8000/getprojects?username=${ghUsername}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="sign-up-container">
      <input type="text" placeholder="Skills" />
      <input
        type="text"
        placeholder="GitHub Username"
        value={ghUsername}
        onChange={(e) => setGhUsername(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default form3;
