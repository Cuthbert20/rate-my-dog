import React from "react";
import "./App.css";
import routes from "./routes";
import { connect } from "react-redux";
import { setUser } from "react-redux";
import axios from "axios";

export class App extends React.Component {
  componentDidMount() {}
  getSession = () => {};
  render() {
    return <div>{routes}</div>;
  }
}

export default App;
