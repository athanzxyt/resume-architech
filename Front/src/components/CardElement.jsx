import React, { useState, useEffect } from 'react';

function CardElement({ project, barContent }) {
  const [showTextBox, setShowTextBox] = useState(false);
  const [textBoxContent, setTextBoxContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // You'd replace this with actual fetching logic
      const serverResponse = project.readme; // Using passed prop for demo
      setTextBoxContent(serverResponse);
    };

    fetchData();
  }, [project.readme]); // Dependency array to avoid infinite loop

  return (
    <div className="card">
      <div className="bar">
        <label>
          <input
            type="checkbox"
            checked={showTextBox}
            onChange={(e) => setShowTextBox(e.target.checked)}
          />
          {barContent}
        </label>
      </div>
      {showTextBox && (
        <div className="dropdown">
          <textarea value={textBoxContent} readOnly />
        </div>
      )}
    </div>
  );
}

export default CardElement; // Ensure CardElement is exported
