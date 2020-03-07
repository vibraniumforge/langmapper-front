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
      </div>
    );
  }
}

export default Navbar;
