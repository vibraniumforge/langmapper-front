import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav id="navbar" className="navbar">
        <ul>
          <li className="no-dropdown">
            <NavLink activeClassName="selected" exact to="/">
              Langmapper
            </NavLink>
          </li>
          <li className="no-dropdown">
            <NavLink activeClassName="selected" exact to="/admin">
              Admin
            </NavLink>
          </li>

          <li className="dropdown functions">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-map bicon"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M15.817.613A.5.5 0 0 1 16 1v13a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 14.51l-4.902.98A.5.5 0 0 1 0 15V2a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0l4.902.98 4.902-.98a.5.5 0 0 1 .415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z"
              />
            </svg>
            <a href="/#" className="dropbtn">
              Map
            </a>
            <ul className="dropdown-content">
              <NavLink activeClassName="selected" to="/create_translation_map">
                Create Translation Map by Area
              </NavLink>
              <NavLink activeClassName="selected" to="/create_gender_map">
                Create Gender Map by Area
              </NavLink>
              <NavLink activeClassName="selected" to="/create_etymology_map">
                Create Etymology Map by Area
              </NavLink>
            </ul>
          </li>

          <li className="dropdown functions">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-search bicon"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              />
              <path
                fillRule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              />
            </svg>
            <a href="/#" className="dropbtn">
              Search
            </a>
            <ul className="dropdown-content">
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
            </ul>
          </li>
          <li className="dropdown functions">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-list-ul bicon"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              />
            </svg>
            <a href="/#" className="dropbtn">
              View
            </a>
            <ul className="dropdown-content">
              <NavLink activeClassName="selected" to="/all_words">
                All Words
              </NavLink>
              <NavLink activeClassName="selected" to="/all_languages">
                All Languages
              </NavLink>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
