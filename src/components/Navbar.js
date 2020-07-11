import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div id="navbar">
        <NavLink activeClassName="selected" exact to="/">
          Home
        </NavLink>
        <NavLink activeClassName="selected" exact to="/admin">
          Admin
        </NavLink>
        <NavLink activeClassName="selected" to="/search_translations">
          Search All Translations of a Word
        </NavLink>
        <NavLink activeClassName="selected" to="/search_genders">
          Search All Genders of a Word
        </NavLink>
        <NavLink activeClassName="selected" to="/search_etymologies">
          Search Word by content of Etymology
        </NavLink>
        {/* {process.env.REACT_APP_NODE_ENV === "development" ? (
          <NavLink activeClassName="selected" to="/grouped_etymologies">
            Search Etymology Grouped (Beta)
          </NavLink>
        ) : null} */}
        {/* {process.env.REACT_APP_NODE_ENV === "development" ? (
          <NavLink
            activeClassName="selected"
            to="/all_translations_by_macrofamily"
          >
            Search All Translations by Macrofamily
          </NavLink>
        ) : null} */}
        <NavLink activeClassName="selected" to="/all_translations_by_language">
          Search All Translations by Language
        </NavLink>
        <NavLink activeClassName="selected" to="/search_translations_by_area">
          Search All Translations by Area
        </NavLink>
        <NavLink activeClassName="selected" to="/search_languages_by_area">
          Search All Languages by Area
        </NavLink>
        <NavLink activeClassName="selected" to="/all_words">
          View All Words
        </NavLink>
        <NavLink activeClassName="selected" to="/all_languages">
          View All Languages
        </NavLink>
        <NavLink activeClassName="selected" to="/create_translation_map">
          Create Translation Map by Area
        </NavLink>
        <NavLink activeClassName="selected" to="/create_gender_map">
          Create Gender Map by Area
        </NavLink>
        {/* {process.env.REACT_APP_NODE_ENV === "development" ? (
          <NavLink activeClassName="selected" to="/create_etymology_map">
            Create Etymology Map by Area (Beta)
          </NavLink>
        ) : null} */}
      </div>
    );
  }
}

export default Navbar;
