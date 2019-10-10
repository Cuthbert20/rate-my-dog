import React, { Component } from "react";
import "./Dashboard.css";
import axios from "axios";

export default class Dashboard extends Component {
  state = {
    dogs: []
  };
  componentDidMount() {
    this.getDogs();
  }
  getDogs = async () => {
    await axios.get("/api/dog/rated").then(res => {
      this.setState({
        dogs: res.data
      });
    });
  };
  backClick = () => {
    this.props.history.push("/home");
  };
  render() {
    console.log(this.state);
    const { dogs } = this.state;
    const ratedDogs = dogs.map((elm, index) => {
      return (
        <div key={elm.dog_id}>
          <img src={elm.img} alt="Cute Dog" />
          <h3>{elm.rating}</h3>
        </div>
      );
    });
    return (
      <div className="dash-container">
        <h1>Your Dashboard</h1>
        <button onClick={this.backClick} className="back-btn">
          Back
        </button>
        {ratedDogs}
      </div>
    );
  }
}
