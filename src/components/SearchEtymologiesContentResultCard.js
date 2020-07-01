import React from "react";
import { etymologyFormatHelper } from "../helpers/etymologyFormatHelpler.js";

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

export default SearchEtymologiesContentResultCard;
