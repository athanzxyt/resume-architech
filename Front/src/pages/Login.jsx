import React from "react";
import { useState } from "react";
import axios from "axios";

function Login() {
  let [username, setUsername] = useState("");

  const signup = () => {
    axios
      .post("http://localhost:8000/checkusername", { username: username })
      .then((res) => {
        if (res.data.exists) {
          alert("Username already exists");
        } else {
          localStorage.setItem("username", username);
          window.location.href = "/personal-info";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = () => {
    axios
      .post("http://localhost:8000/checkusername", { username: username })
      .then((res) => {
        if (res.data.exists) {
          localStorage.setItem("username", username);
          window.location.href = "/personal-info";
        } else {
          alert("Username does not exist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Input Unique Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={signup}>SignUp</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
