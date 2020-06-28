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
        {props.translation.family}
      </p>
      <p>
        <strong>Subfamily: </strong>
        {props.translation.subfamily}
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
        {props.translation.gender}
      </p>
      <p>
        <strong>Etymology: </strong>
        {props.translation.etymology
          ? props.translation.etymology.slice(0, 140)
          : "None found"}
      </p>
      <p>
        {" "}
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
