import React, { useState } from "react";
import Form0 from "./form0";
import Form1 from "./form1";
import Form2 from "./form2";
import Form3 from "./form3";
import "./form.css";
import axios from "axios";

function Form() {
  const [page, setPage] = useState(0);
  const [formInputs, setFormInputs] = useState({
    first: "",
    last: "",
    address: "",
    phone: "",
    email: "",
    education: "",
    skills: "",
    github: "",
  });
  const [loading, setLoading] = useState(false);
  const updateFormInputs = (key, value) => {
    setFormInputs((currInputs) => {
      return { ...currInputs, [key]: value };
    });
  };

  const submit = () => {
    console.log(formInputs);
    setLoading(true);
    axios
      .post("http://localhost:8000/setuserinfo", {
        ...formInputs,
        username: window.localStorage.getItem("username"),
      })
      .then((res) => {
        setLoading(false);
        window.location.href = "/myprojects";
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const FormTitles = [
    "Personal Information",
    "Education History",
    "Skills & GitHub",
  ];

  const forms = [
    <Form1 inputs={formInputs} setInputs={updateFormInputs} />,
    <Form2 inputs={formInputs} setInputs={updateFormInputs} />,
    <Form3 inputs={formInputs} setInputs={updateFormInputs} />,
  ];
  const PageDisplay = () => {
    return forms[page];
  };

  return (
    <div className="first-form">
      <div className="form-container ">
        <div className="header text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide lg:mt-40">
          {FormTitles[page]}
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Previous
          </button>
          {page === FormTitles.length - 1 ? (
            <button onClick={submit}>Submit</button>
          ) : (
            <button
              onClick={() => {
                setPage((currPage) => currPage + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
