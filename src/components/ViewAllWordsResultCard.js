import React from "react";
import EditAndDeleteButtons from "./EditAndDeleteButtons.js";
import { connect } from "react-redux";

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

export default connect(mapStateToProps, null)(ViewAllWordsResultCard);
