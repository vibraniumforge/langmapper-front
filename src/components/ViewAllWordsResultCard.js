import React from "react";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import { connect } from "react-redux";

export const ViewAllWordsResultCard = (props) => {
  return (
    <div className="word-result-card">
      <p>
        <strong>ID: </strong>
        {props.word.id}
      </p>
      <p>
        <strong>Name: </strong>
        {props.word.word_name}
      </p>
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
