import React, { Component } from "react";
import "./Dashboard.css";
import axios from "axios";
import { connect } from "react-redux";

export class Dashboard extends Component {
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
    console.log(this.props);
    const { dogs } = this.state;
    const { username } = this.props;
    const ratedDogs = dogs.map((elm, index) => {
      return (
        <div className="img-container" key={elm.dog_id}>
          <div>
            <img className="dash-dog" src={elm.img} alt="Cute Dog" />
            <h3>
              <span>Rating:</span> {elm.rating}
            </h3>
          </div>
        </div>
      );
    });
    return (
      <div className="dash-container">
        <h1>
          <span id="user">{username}'s</span> Rated Dogs
        </h1>
        <button onClick={this.backClick} className="out-btn">
          Back
        </button>
        <div id="dog-grid">{ratedDogs}</div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { username } = reduxState;
  return {
    username
  };
}

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
