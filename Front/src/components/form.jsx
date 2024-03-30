import React, {useState} from 'react';
import Form0 from './form0';
import Form1 from './form1';
import Form2 from './form2';
import Form3 from './form3';
import './form.css'

function Form() {
    const [page, setPage] = useState(0);
    const FormTitles = ['Set-Up', 'Personal Information', 'Education History', 'Skills & GitHub'];

    const PageDisplay = () => {
        if (page == 0) {
            return <Form0 />
        } else if (page == 1) {
            return <Form1 />
        } else if (page ==2){
            return <Form2 />
        } else{
            return <Form3 />
        }
    };

    return (
        <div className = 'first-form'>
            <div className = 'form-container '>
                <div className = 'header text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide lg:mt-40'>
                    {FormTitles[page]}
                </div>
                <div className = 'body'>{PageDisplay()}</div>
                <div className = 'footer'>
                    <button
                        disabled = {page == 0}
                        onClick = {() => {
                            setPage((currPage) => currPage - 1);
                        }}
                    >Previous
                    </button>
                    {page === FormTitles.length - 1 ? (
                    <button
                        onClick={() => {
                        // Handle form submission logic here
                        console.log("Form submitted!");
                        }}
                    >
                        Submit
                    </button>
                    ) : (
                    <button
                        onClick={() => {
                        setPage((currPage) => currPage + 1);
                        }}
                    >Next</button> )}
                </div>    
            </div>
        </div>
    );
}

export default Form