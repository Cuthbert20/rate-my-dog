import React, { Component } from "react";
import "./Register.css";
import axios from "axios";
import { setUser } from "../../ducks/reducer";
import { connect } from "react-redux";

export class Register extends Component {
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
    // console.log(res.data);
    this.props.setUser({
      userId: res.data.user.user_id,
      username: res.data.user.username
    });
    this.props.history.push("/home");
  };
  loginClick = () => {
    this.props.history.push("/");
  };
  render() {
    const { username, password } = this.state;
    return (
      <div className="register-container">
        <h1 className="header">Register</h1>
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
        <button className="auth-btn" onClick={this.handleClick}>
          Submit
        </button>
        <button className="auth-btn" onClick={this.loginClick}>
          Login
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(Register);
