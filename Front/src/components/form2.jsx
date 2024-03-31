import React from "react";
import "./form1.css";

function form2(props) {
  return (
    <div className="sign-up-container">
      <input
        type="text"
        placeholder="Education History"
        value={props.inputs.education}
        onChange={(e) => props.setInputs("education", e.target.value)}
      />
    </div>
  );
}

export default form2;
