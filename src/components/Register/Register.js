import React, { Component } from "react";
import "./Register.css";
import axios from "axios";

export default class Register extends Component {
  state = {
    username: "",
    password: ""
  };
  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };
  handleClick = async () => {
    const { username, password } = this.state;
    let res = await axios.post("/auth/register", { username, hash: password });
    console.log(res.data);
    this.props.history.push("/home");
  };
  loginClick = () => {
    this.props.history.push("/");
  };
  render() {
    const { username, password } = this.state;
    console.log(this.state);
    return (
      <div>
        <h1>Register</h1>
        <input
          onChange={e => this.handleChange(e, "username")}
          type="text"
          value={username}
          placeholder="Your Name..."
        />
        <input
          onChange={e => this.handleChange(e, "password")}
          type="password"
          value={password}
          placeholder="Password..."
        />
        <button onClick={this.handleClick}>Submit</button>
        <button onClick={this.loginClick}>Back</button>
      </div>
    );
  }
}
