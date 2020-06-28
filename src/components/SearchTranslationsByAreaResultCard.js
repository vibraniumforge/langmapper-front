import React from "react";

export const SearchTranslationsByAreaResultCard = (props) => {
  return (
    <div className="translation-result-card">
      <p>
        <strong>Language: </strong>
        {props.translation.name}
      </p>
      <p>
        <strong>Macrofamily: </strong>
        {props.translation.macrofamily}
      </p>
      <p>
        <strong>Family: </strong>
        {props.translation.family ? props.translation.family : "none"}
      </p>
      <p>
        <strong>Subfamily: </strong>
        {props.translation.subfamily ? props.translation.subfamily : "none"}
      </p>
      <p>
        <strong>Translation: </strong>
        {props.translation.translation}
      </p>
      <p>
        <strong>Romanization: </strong>
        {props.translation.romanization}
      </p>
      <p>
        <strong>Gender: </strong>
        {props.translation.gender ? props.translation.gender : "none"}
      </p>
      <p>
        <strong>Etymology: </strong>
        {props.translation.etymology
          ? props.translation.etymology.slice(0, 140)
          : "None found"}
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
        onClick={(e) => props.onHandleEdit(e, props.translation.t_id)}
        className="card-edit-btn"
      >
        Edit
      </button>
      <button
        onClick={(e) => props.onHandleDelete(e, props.translation.t_id)}
        className="card-delete-btn"
      >
        Delete
      </button>
    </div>
  );
};

export default SearchTranslationsByAreaResultCard;
