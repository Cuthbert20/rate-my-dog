import React, { Component } from "react";
import "./Login.css";

export default class Login extends Component {
  registerClick = () => {
    this.props.history.push("/register");
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Login</h1>
        <input type="text" />
        <input type="text" />
        <button>Login</button>
        <button onClick={this.registerClick}>Register</button>
      </div>
    );
  }
}
