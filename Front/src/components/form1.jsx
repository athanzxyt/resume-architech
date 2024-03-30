import React from 'react'
import './form1.css';

function form1() {
    return (
        <div className = 'sign-up-container'> 
            <input type = 'text' placeholder = 'First Name'/> 
            <input type = 'text' placeholder = 'Last Name'/>
            <input type = 'text' placeholder = 'Address'/> 
            <input type = 'text' placeholder = 'Phone Number'/>
            <input type = 'text' placeholder = 'Email'/>
        </div>
    );
}

export default form1;