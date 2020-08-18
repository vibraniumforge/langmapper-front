import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../actions/userActions.js";
import { createWord } from "../actions/wordActions.js";

//prettier-ignore
// const rejected = ["Concrete", "Vine", "Wind", ]
//prettier-ignore
const chemicals = ["Gold", "Silver", "Copper", "Iron", "Tin", "Lead", "Salt", "Water"]
const materials = ["Amber", "Silk", "Tar", "Wood", "Clay"];
//prettier-ignore
const domesticAnimals = ["Horse", "Cow", "Sheep", "Pig", "Dog", "Cat", "Chicken", "Goat"]
//prettier-ignore
const birds = ["Swan", "Goose", "Owl", "Falcon", "Crow", "Dove", "Eagle", "Gull", "Robin"]
//prettier-ignore
const animals = ["Wolf", "Fox", "Bear", "Mouse", "Otter", "Weasel", "Lion", "Deer"]
const insects = ["Butterfly", "Spider", "Ant", "Bee", "Wasp"];
const reptiles = ["Frog", "Turtle", "Lizard", "Snake"];
const fish = ["Fish", "Trout", "Shark"];
const plants = ["Tree", "Flower", "Grass", "Forest"];
//prettier-ignore
const food = ["Apple", "Blueberry", "Strawberry", "Raspberry", "Carrot"];
//prettier-ignore
const agriculturalProducts = ["Honey", "Milk", "Egg", "Beer", "Wine", "Wheat", "Bread", "Wool"];
//prettier-ignore
const bodyParts = ["Blood", "Tongue", "Tooth", "Ear", "Eye", "Nose", "Hand", "Finger", "Leg"];
const seasons = ["Winter", "Summer", "Autumn"];
const heavens = ["Sun", "Moon", "Sky", "Star"];
const time = ["Day", "Dawn", "Night", "Noon"];
//prettier-ignore
const weather = ["Snow", "Rain", "Hail", "Ice", "Frost", "Cloud", "Fog", "Rainbow", "Thunder", "Lightning"];
const geography = ["Sea", "Mountain", "Lake", "River", "Island"];
const military = ["Shield", "Sword", "Bow", "Arrow", "Spear"];
//prettier-ignore
const technology = ["Wheel", "Chariot", "Sail", "Boat", "Oven", "Fire", "Anvil", "Hammer", "Yoke"];
const textiles = ["Thread", "Needle", "Thimble", "Loom", "Rope", "Cloth"];

const sum = [
  chemicals,
  materials,
  domesticAnimals,
  birds,
  animals,
  insects,
  reptiles,
  fish,
  plants,
  food,
  agriculturalProducts,
  bodyParts,
  seasons,
  heavens,
  time,
  weather,
  geography,
  military,
  technology,
  textiles,
];

const Good_words = [];

sum.forEach((array) => {
  array.forEach((word) => {
    Good_words.push(word);
  });
});

const delay = process.env.REACT_APP_NODE_ENV === "development" ? 90000 : 10000;
const twoGW = ["iron", "copper"];
class LogOut extends Component {
  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  };

  //   const testSeed = () => {
  //     console.log("testSeed fires");
  //     Good_word.forEach((word, index) => {
  //       setTimeout(() => {
  //         console.log("word=", word);
  //         this.props.createWord(word);
  //       }, index * 90000);
  //     });
  //   };

  handleOnSeed = (e) => {
    e.preventDefault();
    twoGW.forEach((word, index) => {
      setTimeout(() => {
        console.log(`Word: ${word}, Index: ${index} of ${Good_words.length}`);
        // const newWord = {
        //   word_name: word.toLowerCase(),
        // };
        this.props.createWord(word.toLowerCase());
      }, index * delay);
    });
    console.log("DONE");
  };

  //   handleOnSeed = (e) => {
  //     e.preventDefault();
  //     Good_words.forEach((word, index) => {
  //       setTimeout(() => {
  //         console.log(`Word: ${word}, Index: ${index} of ${Good_words.length}`);
  //         const newWord = {
  //           word_name: word.toLowerCase(),
  //         };
  //         this.props.createWord(newWord);
  //       }, index * delay);
  //     });
  //     console.log("DONE");
  //   };

  render() {
    return (
      <>
        <form id="logout-form" onSubmit={this.handleOnSubmit}>
          <h3>Admin Logout</h3>
          <div className="full-col">
            <input type="submit" value="Logout" className="logout-btn" />
          </div>
          <h3>Seed</h3>
          <div className="full-col">
            <button
              type="button"
              className="logout-btn"
              onClick={this.handleOnSeed}
            >
              Seed
            </button>
            <h3>Environment - {process.env.REACT_APP_NODE_ENV}</h3>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout,
      createWord,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogOut));
