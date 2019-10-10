import React from "react";
import "./App.css";
import routes from "./routes";
import { connect } from "react-redux";
import { setUser } from "./ducks/reducer";
import axios from "axios";

export class App extends React.Component {
  componentDidMount() {
    this.getSession();
  }
  getSession = () => {
    try {
      axios.get(`/auth/session`).then(res => {
        if (res.data.user) {
          this.props.setUser({
            username: res.data.user.username,
            userId: res.data.user.user_id
          });
        }
      });
    } catch (err) {
      console.log(err, "can't get session");
    }
  };
  render() {
    return <div>{routes}</div>;
  }
}

export default connect(
  null,
  { setUser }
)(App);
