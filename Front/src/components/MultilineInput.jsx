import React, { useState } from 'react';

function MultilineInput() {
  const [textValue, setTextValue] = useState('');

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitted Text:', textValue);
    // Add logic here to handle the submission of the textValue
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '50vw',
      position: 'absolute',
      left: '0',
      top: '0',
      padding: '70px',
    }}>
      <div style={{
        border: '2px solid #55c1bd', // Blue border around the text
        padding: '10px', // Padding inside the border
        marginBottom: '20px', // Margin below the text box to separate from the textarea
        textAlign: 'center', // Center-align the text
        width: '100%', // Take full width of its container
        boxSizing: 'border-box', // Include padding and border in the element's dimensions
      }}>
        Enter job description:
      </div>
      <textarea
        value={textValue}
        onChange={handleChange}
        placeholder="Enter your text here"
        style={{
          width: '100%',
          height: '150px',
          padding: '10px',
          boxSizing: 'border-box',
          resize: 'none',
          outline: '2px solid #55c1bd',
          borderRadius: '5px',
          marginBottom: '20px',
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 20px',
          border: '1px solid #d0d0d0',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default MultilineInput;
