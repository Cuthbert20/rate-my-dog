import React, { Component } from "react";
import axios from "axios";
import "./Main.css";
import { connect } from "react-redux";
import { logoutUser, dogsRated } from "../../ducks/reducer";
import Swal from "sweetalert2";

export class Main extends Component {
  state = {
    randomDog: "",
    rating: "",
    breedList: [],
    dogBreed: ""
  };
  componentDidMount() {
    this.dogApiImg();
    this.byBreed();
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
  newDog = () => {
    axios.get(`https://dog.ceo/api/breeds/image/random`).then(res => {
      console.log(res.data.message);
      this.setState({
        randomDog: res.data.message
      });
    });
  };
  byBreed = () => {
    axios.get(`https://dog.ceo/api/breeds/list/all`).then(res => {
      console.log(res.data.message);
      this.setState({
        breedList: res.data.message
      });
    });
  };
  chosenBreed = () => {
    const { dogBreed } = this.state;
    axios
      .get(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
      .then(res => {
        this.setState({
          randomDog: res.data.message
        });
      });
  };
  newAddDog = async () => {
    const { randomDog, rating } = this.state;
    await axios.post("/api/dog", { img: randomDog, rating });
    Swal.fire("Your Rating Has Been Added");
  };
  // addDog = () => {
  //   const { randomDog } = this.state;
  //   this.setState(state => {
  //     const dogList = state.dogList.concat(randomDog);
  //     return {
  //       dogList
  //     };
  //   });
  // };
  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };
  showDash = () => {
    this.props.history.push("/dashboard");
  };
  handleBreed = e => {
    this.setState({
      dogBreed: e.target.value
    });
  };
  render() {
    const { randomDog, rating, dogBreed, breedList } = this.state;
    console.log(typeof breedList);
    console.log(this.state);
    // const allBreeds = Object.entries(breedList).map(([key, value]) => {
    //   return (
    //     <div>
    //       <h1>{key}</h1>
    //     </div>
    //   );
    // });
    return (
      <div className="main-container">
        <h1 className="title">Lets Rate Dogs</h1>
        <h5>On a Scale of 10 to 16</h5>
        <button onClick={this.logout} className="out-btn">
          LogOut
        </button>
        <main className="dog-container">
          <img className="dog-img" src={randomDog} alt="Displaying Cute Dog" />
          {/* need to add a dropdown where rating can be selected and saved along with the photo then displayed
          on dashboard component */}
          <button onClick={this.newDog}>Next</button>
          <select value={dogBreed} onChange={e => this.handleBreed(e)}>
            <option>SELECT Dog Breed</option>
            {Object.entries(breedList).map(([key, value]) => {
              return (
                <option value={key} key={key}>
                  {key}
                </option>
              );
            })}
            {/* {breedList.map((elm, index) => {
              return (
                <option key={index} value={elm}>
                  {elm[index]}
                </option>
              );
            })} */}
          </select>
          <button onClick={this.chosenBreed}>Select by Breed</button>
          <input
            onChange={e => this.handleChange(e, "rating")}
            value={rating}
            placeholder="Rate this Photo between 10-16"
            type="text"
          />
          <button onClick={this.newAddDog}>Submit</button>
          <button onClick={this.showDash}>See Your Dashboard</button>
        </main>
        {/* {allBreeds} */}
      </div>
    );
  }
}

export default connect(
  null,
  { logoutUser, dogsRated }
)(Main);
