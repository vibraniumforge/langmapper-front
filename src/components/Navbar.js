import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div id="navbar">
        <NavLink activeClassName="selected" exact to="/">
          Home
        </NavLink>
        <NavLink activeClassName="selected" to="/search_translations">
          Find All Translations of a Word
        </NavLink>
        <NavLink activeClassName="selected" to="/search_genders">
          Find all Genders of a Word
        </NavLink>
        <NavLink activeClassName="selected" to="/search_genders">
          Create a new Word
        </NavLink>
        <NavLink activeClassName="selected" to="/search_genders">
          Create a new Translation
        </NavLink>
        <NavLink activeClassName="selected" to="/search_genders">
          Create a new Language
        </NavLink>
      </div>
    );
  }
}

export default Navbar;
