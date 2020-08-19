import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../actions/userActions.js";
import { createWord } from "../actions/wordActions.js";

//prettier-ignore
// const rejected = ["Concrete", "Vine", "Wind", "Blueberry", "Chariot", "Chicken", "Cloth", "Dawn", "Gull", "Lightning", "Lizard", "Noon", "Robin", "Trout", "Weasel" ]
//prettier-ignore
const chemicals = ["Gold", "Silver", "Copper", "Iron", "Tin", "Lead", "Salt", "Water", ]
const materials = ["Amber", "Silk", "Tar", "Wood", "Clay"];
//prettier-ignore
const domesticAnimals = ["Horse", "Cow", "Sheep", "Pig", "Dog", "Cat", "Goat"]
//prettier-ignore
const birds = ["Swan", "Goose", "Owl", "Falcon", "Crow", "Dove", "Eagle" ]
//prettier-ignore
const animals = ["Wolf", "Fox", "Bear", "Mouse", "Otter", "Lion", "Deer"]
const insects = ["Butterfly", "Spider", "Ant", "Bee", "Wasp"];
const reptiles = ["Frog", "Turtle", "Snake"];
const fish = ["Fish", "Shark"];
const plants = ["Tree", "Flower", "Grass", "Forest"];
//prettier-ignore
const food = ["Apple",  "Strawberry", "Raspberry", "Carrot"];
//prettier-ignore
const agriculturalProducts = ["Honey", "Milk", "Egg", "Beer", "Wine", "Wheat", "Bread", "Wool"];
//prettier-ignore
const bodyParts = ["Blood", "Tongue", "Tooth", "Ear", "Eye", "Nose", "Hand", "Finger", "Leg"];
const seasons = ["Winter", "Summer", "Autumn"];
const heavens = ["Sun", "Moon", "Sky", "Star"];
const time = ["Day", "Night"];
//prettier-ignore
const weather = ["Snow", "Rain", "Hail", "Ice", "Frost", "Cloud", "Fog", "Rainbow", "Thunder", ];
const geography = ["Sea", "Mountain", "Lake", "River", "Island"];
const military = ["Shield", "Sword", "Bow", "Arrow", "Spear"];
//prettier-ignore
const technology = ["Wheel", "Sail", "Boat", "Oven", "Fire", "Anvil", "Hammer", "Yoke"];
const textiles = ["Thread", "Needle", "Thimble", "Loom", "Rope"];

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

const delay = process.env.REACT_APP_NODE_ENV === "development" ? 90000 : 20000;
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
    Good_words.forEach((word, index) => {
      setTimeout(() => {
        console.log("\n");
        console.log(
          `This Word: ${word}, Index: ${index} of ${Good_words.length}`
        );
        console.log("\n");
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
