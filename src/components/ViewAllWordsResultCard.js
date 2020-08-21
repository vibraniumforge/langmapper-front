import React from "react";
import EditAndDeleteButtons from "./EditAndDeleteButtons.js";
import { connect } from "react-redux";

import { withRouter, NavLink } from "react-router-dom";

export const ViewAllWordsResultCard = (props) => {
  return (
    <div className="word-result-card">
      <h1>{props.word.word_name}</h1>
      {props.loggedIn ? (
        <p>
          <strong>ID: </strong>
          {props.word.id}
        </p>
      ) : null}
      {/* <p>
        <strong>Name: </strong>
        {props.word.word_name}
      </p> */}
      <p>
        <strong>Definition: </strong>
        {props.word.definition}
      </p>
      <p>
        {" "}
        <NavLink
          activeClassName="selected"
          to="/search_all_translations_by_word"
          onClick={(e) => props.onHandleSubmit(e, props.word.word_name)}
        >
          View all Translations
        </NavLink>{" "}
      </p>
      {props.loggedIn ? (
        <>
          <EditAndDeleteButtons
            onHandleEdit={props.onHandleEdit}
            onHandleDelete={props.onHandleDelete}
            translation={props.word}
          />
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       searchTranslationsByWord,
//     },
//     dispatch
//   );

export default withRouter(
  connect(mapStateToProps, null)(ViewAllWordsResultCard)
);
