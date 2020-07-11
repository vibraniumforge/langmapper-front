import React from "react";
import { etymologyFormatHelper } from "../helpers/etymologyFormatHelpler.js";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import { connect } from "react-redux";

export const SearchEtymologiesContentResultCard = (props) => {
  return (
    <div className="translation-result-card">
      <p>
        <strong>Word: </strong> {props.translation.word_name}
      </p>
      <p>
        <strong>Language: </strong> {props.translation.name}
      </p>
      <p>
        <strong>Translation: </strong> {props.translation.translation}
      </p>
      <p>
        <strong>Romanization: </strong> {props.translation.romanization}
      </p>
      <p>
        <strong>Etymology: </strong>
        {etymologyFormatHelper(props.translation.etymology)}
      </p>
      <p>
        <img
          src={require("../images/wiktionary.ico")}
          alt="icon"
          className="wiktionary-icon"
        />
        <strong>
          <a
            href={props.translation.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiktionary
          </a>
        </strong>
      </p>
      {props.loggedIn ? (
        <>
          <EditAndDeleteButtons
            onHandleEdit={props.onHandleEdit}
            onHandleDelete={props.onHandleDelete}
            translation={props.translation}
          />
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});

export default connect(
  mapStateToProps,
  null
)(SearchEtymologiesContentResultCard);
