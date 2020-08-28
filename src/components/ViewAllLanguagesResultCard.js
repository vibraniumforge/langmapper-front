import React from "react";
import EditAndDeleteButtons from "./EditAndDeleteButtons.js";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";

export const ViewAllLanguagesResultCard = (props) => {
  return (
    <div className="language-result-card">
      <h1>{props.language.name}</h1>
      {props.loggedIn ? (
        <p>
          <strong>ID: </strong>
          {props.language.id}
        </p>
      ) : null}
      {/* <p>
        <strong>Name: </strong>
        {props.language.name}
      </p> */}
      <p>
        <strong>Abbreviation: </strong>
        {props.language.abbreviation}
      </p>
      <p>
        <strong>Alphabet: </strong>
        {props.language.alphabet}
      </p>
      <p>
        <strong>Macrofamily: </strong>
        {props.language.macrofamily}
      </p>
      <p>
        <strong>Family: </strong>
        {props.language.family}
      </p>
      <p>
        <strong>Subfamily:</strong> {props.language.subfamily}
      </p>
      <p>
        <strong>Area 1: </strong>
        {props.language.area1}
      </p>
      <p>
        <strong>Area 2: </strong>
        {props.language.area2}
      </p>
      <p>
        <strong>Area 3: </strong>
        {props.language.area3}
      </p>
      <p>
        <strong>Alive: </strong>
        {["f", false].includes(props.language.alive) ? "false" : "true"}
      </p>
      <p>
        <strong>Notes: </strong>
        {props.language.notes}
      </p>
      <p>
        {" "}
        <NavLink
          activeClassName="selected"
          to="/search_all_translations_by_language"
          onClick={(e) => props.onHandleSubmit(e, props.language.name)}
        >
          <button type="button" className="submit-btn">
            View Translations
          </button>
        </NavLink>{" "}
      </p>
      {props.loggedIn ? (
        <>
          <EditAndDeleteButtons
            onHandleEdit={props.onHandleEdit}
            onHandleDelete={props.onHandleDelete}
            translation={props.language}
          />
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});

export default withRouter(
  connect(mapStateToProps, null)(ViewAllLanguagesResultCard)
);
