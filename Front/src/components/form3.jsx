import React from "react";
import { useState } from "react";
import "./form1.css";
import axios from "axios";

function form3(props) {
  return (
    <div className="sign-up-container">
      <input type="text" placeholder="Skills" />
      <input
        type="text"
        placeholder="GitHub Username"
        value={props.inputs.github}
        onChange={(e) => props.setInputs("github", e.target.value)}
      />
    </div>
  );
}

export default form3;
