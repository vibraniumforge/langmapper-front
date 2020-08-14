import React from "react";
import {
  genderFormatHelper,
  genderColorHelper,
  genderPresenceHelper,
} from "../helpers/genderFormatHelper.js";
import { languageFormatHelperCard } from "../helpers/languageFormatHelper.js";
import EditAndDeleteButtons from "./EditAndDeleteButtons.js";
import WiktionaryLink from "./WiktionaryLink.js";
import { connect } from "react-redux";

export const SearchAllGendersResultCard = (props) => {
  return (
    <div
      className={`gender-result-card ${genderColorHelper(
        props.translation.macrofamily,
        props.translation.name,
        props.translation.gender
      )}`}
    >
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
      {/* <h3>{props.translation.translation}</h3>
      {props.translation.translation !== props.translation.romanization ? (
        <h3>{props.translation.romanization}</h3>
      ) : null} */}
      <h2>
        <i>{props.translation.translation}</i>
      </h2>
      {props.translation.translation !== props.translation.romanization ? (
        <h3>({props.translation.romanization})</h3>
      ) : null}
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
        <strong>Macrofamily: </strong>{" "}
        {languageFormatHelperCard(props.translation.macrofamily)}
      </p>
      <p>
        <strong>Family: </strong> {props.translation.family}
      </p>
      {/* <p>
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
      ) : null} */}

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

export default connect(mapStateToProps, null)(SearchAllGendersResultCard);
