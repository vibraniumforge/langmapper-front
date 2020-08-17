import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div id="navbar-admin">
        <NavLink activeClassName="selected" exact to="/">
          Home
        </NavLink>
        <NavLink activeClassName="selected" exact to="/admin">
          Admin
        </NavLink>
        <NavLink
          activeClassName="selected"
          to="/search_all_translations_by_word"
        >
          Search All Translations of a Word
        </NavLink>
        <NavLink
          activeClassName="selected"
          to="/search_all_translations_by_gender"
        >
          Search All Genders of a Word
        </NavLink>
        <NavLink
          activeClassName="selected"
          to="/search_all_translations_by_etymology"
        >
          Search Translation by content of Etymology
        </NavLink>
        <NavLink
          activeClassName="selected"
          to="/search_all_translations_by_macrofamily"
        >
          Search All Translations by Macrofamily
        </NavLink>
        <NavLink
          activeClassName="selected"
          to="/search_all_translations_by_language"
        >
          Search All Translations by Language
        </NavLink>
        <NavLink
          activeClassName="selected"
          to="/search_all_translations_by_area"
        >
          Search All Translations by Area
        </NavLink>
        <NavLink activeClassName="selected" to="/search_all_languages_by_area">
          Search All Languages by Area
        </NavLink>
        <NavLink activeClassName="selected" to="/view_all_words">
          View All Words
        </NavLink>
        <NavLink activeClassName="selected" to="/new_word">
          Create a New Word
        </NavLink>
        <NavLink activeClassName="selected" to="/view_all_languages">
          View All Languages
        </NavLink>
        <NavLink activeClassName="selected" to="/create_translation_map">
          Create Translation Map by Area
        </NavLink>
        <NavLink activeClassName="selected" to="/create_gender_map">
          Create Gender Map by Area
        </NavLink>
        <NavLink activeClassName="selected" to="/create_etymology_map">
          Create Etymology Map by Area
        </NavLink>
      </div>
    );
  }
}

export default Navbar;
