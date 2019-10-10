import React, { Component } from "react";
import axios from "axios";
import "./Main.css";
import { connect } from "react-redux";
import { logoutUser } from "../../ducks/reducer";

export class Main extends Component {
  state = {
    randomDog: ""
  };
  componentDidMount() {
    this.dogApiImg();
  }
  dogApiImg = () => {
    axios.get(`https://dog.ceo/api/breeds/image/random`).then(res => {
      console.log(res.data);
      this.setState({
        randomDog: res.data.message
      });
    });
  };
  logout = () => {
    //destroying session
    axios.post("/auth/logout");
    //setting Redux back to initalState
    this.props.logoutUser();
    //pusing the user back to home
    this.props.history.push("/");
  };
  render() {
    const { randomDog } = this.state;
    return (
      <div className="main-container">
        <h1 className="title">Lets Rate Dogs</h1>
        <h5>On a Scale of 1 to 11</h5>
        <button onClick={this.logout} className="out-btn">
          LogOut
        </button>
        <main className="dog-container">
          <img className="dog-img" src={randomDog} alt="Displaying Cute Dog" />
          {/* need to add a dropdown where rating can be selected and saved along with the photo then displayed
          on dashboard component */}
        </main>
      </div>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(Main);
