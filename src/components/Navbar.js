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
          Search All Translations of a Word
        </NavLink>
        <NavLink activeClassName="selected" to="/search_genders">
          Search all Genders of a Word
        </NavLink>
        <NavLink activeClassName="selected" to="/search_etymologies">
          Search by content of Etymology
        </NavLink>
        {/* <NavLink activeClassName="selected" to="/grouped_etymologies">
          Search Etymology Grouped (Beta)
        </NavLink> */}
        {/* <NavLink
          activeClassName="selected"
          to="/all_translations_by_macrofamily"
        >
          Search all Translations by Macrofamily
        </NavLink> */}
        <NavLink activeClassName="selected" to="/all_translations_by_language">
          Search all Translations by Language
        </NavLink>
        <NavLink activeClassName="selected" to="/search_translations_by_area">
          Search Translations by Area
        </NavLink>
        <NavLink activeClassName="selected" to="/search_languages_by_area">
          Search Languages by Area
        </NavLink>
        <NavLink activeClassName="selected" to="/all_words">
          View all Words
        </NavLink>
        <NavLink activeClassName="selected" to="/new_word">
          Create a New Word
        </NavLink>
        <NavLink activeClassName="selected" to="/all_languages">
          View all Languages
        </NavLink>
        <NavLink activeClassName="selected" to="/create_translation_map">
          Create Translation Map by Area
        </NavLink>
        {/* <NavLink activeClassName="selected" to="/create_etymology_map">
          Create Etymology Map by Area (Beta)
        </NavLink> */}
        <NavLink activeClassName="selected" to="/create_gender_map">
          Create Gender Map by Area
        </NavLink>
      </div>
    );
  }
}

export default Navbar;
