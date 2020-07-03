import React from "react";
import { genderHelper, genderColorHelper } from "../helpers/genderHelper.js";

export const SearchAllGendersResultCard = (props) => {
  return (
    <div
      className={`gender-result-card ${genderColorHelper(
        props.translation.macrofamily,
        props.translation.name,
        props.translation.gender
      )}`}
    >
      <p>
        <strong>Family: </strong> {props.translation.family}
      </p>
      <p>
        <strong>Language: </strong> {props.translation.name}
      </p>
      <p>
        <strong>Translation: </strong> {props.translation.romanization}
      </p>
      <p>
        <strong>Romanization: </strong> {props.translation.romanization}
      </p>
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
      <button
        onClick={(e) => props.onHandleEdit(e, props.translation.id)}
        className="card-edit-btn"
      >
        Edit
      </button>
      <button
        onClick={(e) => props.onHandleDelete(e, props.translation.id)}
        className="card-delete-btn"
      >
        Delete
      </button>
    </div>
  );
};

export default SearchAllGendersResultCard;
