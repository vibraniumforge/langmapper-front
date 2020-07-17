import React from "react";
import { genderHelper, genderColorHelper } from "../helpers/genderHelper.js";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
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
      <h1>{props.translation.name}</h1>
      {props.loggedIn ? (
        <p>
          <strong>Translation Id: </strong>
          {props.translation.id}
        </p>
      ) : null}
      <p>
        <strong>Family: </strong> {props.translation.family}
      </p>
      {/* <p>
        <strong>Language: </strong> {props.translation.name}
      </p> */}
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
        <strong>Gender: </strong>
        <strong>
          <span className="">
            {genderHelper(
              props.translation.macrofamily,
              props.translation.name,
              props.translation.gender
            )}
          </span>
        </strong>
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

export default connect(mapStateToProps, null)(SearchAllGendersResultCard);
