import React from "react";

export const SearchTranslationsByLanguageResultCard = (props) => {
  return (
    <div className="translation-result-card">
      <p>
        <strong>Word: </strong>
        {props.translation.word_name}
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
      <a href={props.translation.link}>Wiktionary</a>
      <p>
        <strong>Etymology: </strong>
        {props.translation.etymology
          ? props.translation.etymology.slice(0, 140)
          : "None found"}
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

export default SearchTranslationsByLanguageResultCard;
