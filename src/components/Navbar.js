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
      </div>
    );
  }
}

export default Navbar;
