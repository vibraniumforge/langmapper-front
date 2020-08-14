import React from "react";
import { etymologyFormatHelper } from "../helpers/etymologyFormatHelpler.js";
import {
  genderFormatHelper,
  genderPresenceHelper,
} from "../helpers/genderFormatHelper.js";
import EditAndDeleteButtons from "./EditAndDeleteButtons.js";
import WiktionaryLink from "./WiktionaryLink.js";

import { connect } from "react-redux";

export const SearchTranslationsByAreaResultCard = (props) => {
  return (
    <div className="translation-result-card">
      {props.loggedIn ? (
        <div>
          <p>
            <strong>Translation Id: </strong>
            {props.translation.id}
          </p>
          <p>
            <strong>Language Id: </strong>
            {props.translation.language_id}
          </p>
          <p>
            <strong>Word Id: </strong>
            {props.translation.word_id}
          </p>
        </div>
      ) : null}
      <h1>{props.translation.name}</h1>
      <h2>
        <i>{props.translation.translation}</i>
      </h2>
      {props.translation.translation !== props.translation.romanization ? (
        <h3>({props.translation.romanization})</h3>
      ) : null}
      {/* <p>
        <strong>Language: </strong>
        {props.translation.name}
      </p> */}
      <p>
        <strong>Macrofamily: </strong>
        {props.translation.macrofamily}
      </p>
      <p>
        <strong>Family: </strong>
        {props.translation.family}
      </p>
      <p>
        <strong>Subfamily: </strong>
        {props.translation.subfamily}
      </p>
      {/* <p>
        <strong>Translation: </strong>
        {props.translation.translation}
      </p>
      {props.translation.translation !== props.translation.romanization ? (
        <p>
          <strong>Romanization: </strong>
          {props.translation.romanization}
        </p>
      ) : null} */}
      {genderPresenceHelper(
        props.translation.macrofamily,
        props.translation.name,
        props.translation.gender
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
)(SearchTranslationsByAreaResultCard);
