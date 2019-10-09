import React, { Component } from "react";
import "./Login.css";
import Register from "../Register/Register";

export default class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <input type="text" />
        <input type="text" />
        <button>Register</button>
        <button>Submit</button>
      </div>
    );
  }
}
