import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div id="navbar" className="non-admin-navbar">
        <ul>
          <li className="only">
            <NavLink activeClassName="selected" exact to="/">
              Langmapper
            </NavLink>
          </li>
          <li className="only">
            <NavLink activeClassName="selected" exact to="/admin">
              Admin
            </NavLink>
          </li>
          <li className="dropdown functions">
            <a href="/#" className="dropbtn">
              Map
            </a>
            <div className="dropdown-content">
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
          </li>
          <li className="dropdown functions">
            <a href="/#" className="dropbtn">
              View
            </a>
            <div className="dropdown-content">
              <NavLink activeClassName="selected" to="/all_words">
                All Words
              </NavLink>
              <NavLink activeClassName="selected" to="/all_languages">
                All Languages
              </NavLink>
            </div>
          </li>
          <li className="dropdown functions">
            <a href="/#" className="dropbtn">
              Search
            </a>
            <div className="dropdown-content">
              <NavLink
                activeClassName="selected"
                to="/search_all_translations_by_word"
              >
                All Translations of a Word
              </NavLink>
              <NavLink activeClassName="selected" to="/search_genders">
                All Translations of a Word by Gender
              </NavLink>
              <NavLink activeClassName="selected" to="/search_etymologies">
                All Translations by content of Etymology
              </NavLink>
              <NavLink
                activeClassName="selected"
                to="/search_all_translations_by_language"
              >
                All Translations by Language
              </NavLink>
              <NavLink
                activeClassName="selected"
                to="/search_translations_by_area"
              >
                All Translations by Area
              </NavLink>
              <NavLink
                activeClassName="selected"
                to="/search_languages_by_area"
              >
                All Languages by Area
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
