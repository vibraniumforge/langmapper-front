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
        <NavLink activeClassName="selected" to="/search_etymologies">
          Search by content of Etymology
        </NavLink>
        <NavLink activeClassName="selected" to="/grouped_etymologies">
          Search Etymology Grouped
        </NavLink>
        <NavLink
          activeClassName="selected"
          to="/all_translations_by_macrofamily"
        >
          All Translations by Macrofamily
        </NavLink>
        <NavLink activeClassName="selected" to="/all_translations_by_language">
          All Translations by Language
        </NavLink>
        <NavLink activeClassName="selected" to="/new_word">
          Create a New Word
        </NavLink>
        <NavLink activeClassName="selected" to="/all_words">
          View all Words
        </NavLink>
        <NavLink activeClassName="selected" to="/new_language">
          Create a new Language
        </NavLink>
        <NavLink activeClassName="selected" to="/all_languages">
          View all Languages
        </NavLink>
        <NavLink activeClassName="selected" to="/search_by_area">
          Search Language by Area
        </NavLink>
      </div>
    );
  }
}

export default Navbar;
