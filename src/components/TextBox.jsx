import React, { useState } from 'react';

function TextBox() {
  const [textValue, setTextValue] = useState('');

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  return (
    <div>
      <textarea
        value={textValue}
        onChange={handleChange}
        rows="4"  // Number of rows (lines) to display
        cols="50" // Number of characters wide the text area should be
        style={{ width: '100%', height: '200px' }} // CSS styles for width and height
        placeholder="Enter your text here"
      />
      <p>Text Value: {textValue}</p>
    </div>
  );
}

export default TextBox;
