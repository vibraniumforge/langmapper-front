import React from "react";
import {
  genderFormatHelper,
  genderPresenceHelper,
} from "../helpers/genderHelper.js";
import { etymologyFormatHelper } from "../helpers/etymologyFormatHelpler.js";
import EditAndDeleteButtons from "./EditAndDeleteButtons.js";
import WiktionaryLink from "./WiktionaryLink.js";
import { connect } from "react-redux";

export const SearchEtymologiesContentResultCard = (props) => {
  return (
    <div className="translation-result-card">
      {/* <h1>{props.translation.name}</h1> */}
      {props.loggedIn ? (
        <p>
          <strong>Translation Id: </strong>
          {props.translation.id}
        </p>
      ) : null}
      <p>
        <strong>Word: </strong> {props.translation.word_name}
      </p>
      {genderPresenceHelper(
        props.translation.name,
        props.translation.macrofamily
      ) ? (
        <p>
          <strong>Gender: </strong>
          <strong>
            <span className="">
              {genderFormatHelper(
                props.translation.macrofamily,
                props.translation.name,
                props.translation.gender
              )}
            </span>
          </strong>
        </p>
      ) : null}
      <p>
        <strong>Language: </strong> {props.translation.name}
      </p>
      <p>
        <strong>Translation: </strong> {props.translation.translation}
      </p>
      {props.translation.translation !== props.translation.romanization ? (
        <p>
          <strong>Romanization: </strong>
          {props.translation.romanization}
        </p>
      ) : null}
      <p>
        <strong>Etymology: </strong>
        {etymologyFormatHelper(props.translation.etymology)}
      </p>
      <p>
        <strong>Link: </strong>
        <WiktionaryLink link={props.translation.link} />
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
