import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  registerClick = () => {
    this.props.history.push("/register");
  };
  login = async () => {
    const { username, password } = this.state;
    await axios.post("/auth/login", { username, password }).then(res => {
      const { username } = res.data.user;
      this.props.setUser({
        username: username
      });
      this.props.history.push("/home");
    });
  };
  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };
  render() {
    const { username, password } = this.state;
    // console.log(this.state);
    return (
      <div className="login-container">
        <h1 className="header">Login</h1>
        <input
          onChange={e => this.handleChange(e, "username")}
          value={username}
          placeholder="Your Username..."
          type="text"
        />
        <input
          onChange={e => this.handleChange(e, "password")}
          value={password}
          placeholder="Your Password..."
          type="password"
        />
        <button className="auth-btn" onClick={this.login}>
          Submit
        </button>
        <button className="auth-btn" onClick={this.registerClick}>
          Register
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(Login);
