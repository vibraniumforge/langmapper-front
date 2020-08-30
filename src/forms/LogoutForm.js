import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../actions/userActions.js";
import { createWord } from "../actions/wordActions.js";

//prettier-ignore
// const rejected = ["Concrete", "Vine", "Wind", "Blueberry", "Chariot", "Chicken", "Cloth",
// "Dawn", "Gull", "Lizard", "Noon", "Robin", "Trout", "Weasel", "Loom", "Olive", "Ox", "Dragonfly", "Ruby"
// "Log",]
//prettier-ignore
// forSureAdd=[]
//prettier-ignore
// maybeAdd =[ "Bible"]
//prettier-ignore
const elements = ["Gold", "Silver", "Copper", "Iron", "Tin", "Lead" ]
const chemicals = ["Brass", "Bronze", "Salt", "Water"];
//prettier-ignore
const materials = ["Amber", "Silk", "Tar", "Wood", "Clay", "Sand", "Coal", "Oil"];
//prettier-ignore
const domesticAnimals = ["Horse", "Cow", "Ox", "Sheep", "Pig", "Dog", "Cat", "Goat", "Donkey"]
//prettier-ignore
const birds = ["Bird", "Feather", "Wing", "Swan", "Goose", "Owl", "Falcon", "Crow", "Dove", "Eagle" ]
//prettier-ignore
const animals = ["Wolf", "Fox", "Bear", "Mouse", "Otter", "Lion", "Deer", "Lynx", "Rabbit"]
//prettier-ignore
const insects = ["Butterfly", "Spider", "Ant", "Bee", "Wasp", "Flea"];
const reptiles = ["Frog", "Turtle", "Snake"];
const fish = ["Fish", "Shark", "Salmon"];
//prettier-ignore
const plants = ["Tree", "Flower", "Grass", "Forest", "Leaf", "Seed", "Mushroom"];
//prettier-ignore
const food = ["Apple", "Strawberry", "Raspberry", "Carrot", "Pear"];
//prettier-ignore
const agriculturalProducts = ["Honey", "Milk", "Egg", "Wheat", "Wool"];
const refinedAgriculturalProducts = ["Beer", "Wine", "Bread", "Cheese"];
//prettier-ignore
const headParts = ["Tongue", "Tooth", "Ear", "Eye", "Nose", "Mouth"];
//prettier-ignore
const bodyParts = ["Blood", "Hand", "Finger", "Leg", "Bone"];
const organs = ["Brain", "Heart", "Lung", "Liver", "Stomach"];
const seasons = ["Winter", "Summer", "Autumn"];
const heavens = ["Sun", "Moon", "Sky", "Star"];
const time = ["Day", "Night", "Tide"];
//prettier-ignore
const weather = ["Snow", "Rain", "Hail", "Ice", "Frost"];
const atmosphere = ["Cloud", "Fog", "Rainbow", "Thunder", "Lightning"];
const geography = ["Sea", "Mountain", "Lake", "River", "Island"];
const military = ["Shield", "Sword", "Bow", "Arrow", "Spear"];
const buildings = ["Castle", "Bridge"];
const culture = ["Song", "King"];
//prettier-ignore
const technology = ["Wheel", "Sail", "Boat", "Oven", "Fire", "Anvil", "Hammer", "Yoke", "Candle", "Shoe", "Key"];
const textiles = ["Thread", "Needle", "Thimble", "Rope"];

const sum = [
  elements,
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
  refinedAgriculturalProducts,
  headParts,
  bodyParts,
  organs,
];

const sum2 = [
  seasons,
  heavens,
  time,
  weather,
  atmosphere,
  geography,
  military,
  buildings,
  culture,
  technology,
  textiles,
];

const Good_words = [];

sum.forEach((array) => {
  array.forEach((word) => {
    Good_words.push(word);
  });
});

sum2.forEach((array) => {
  array.forEach((word) => {
    Good_words.push(word);
  });
});

const delay = process.env.REACT_APP_NODE_ENV === "development" ? 90000 : 20000;

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
