import React, { useState, useEffect } from "react";

function CardElement({ project, barContent, setProjects }) {
  const [showTextBox, setShowTextBox] = useState(false);

  return (
    <div className="card">
      <div className="bar">
        <label>
          <input
            type="checkbox"
            checked={project.selected ?? false}
            onChange={(e) => {
              setProjects((prevProjects) => {
                let newProjects = { ...prevProjects };
                newProjects[project.name] = {
                  ...project,
                  selected: e.target.checked,
                };
                return newProjects;
              });
            }}
          />
          {barContent}
        </label>
      </div>
      {showTextBox && (
        <div className="dropdown">
          <textarea value={project.readme} readOnly />
        </div>
      )}
    </div>
  );
}

export default CardElement; // Ensure CardElement is exported
