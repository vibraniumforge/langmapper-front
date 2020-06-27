import React from "react";

export const ViewAllLanguagesResultCard = (props) => {
  return (
    <div className="language-result-card">
      <p>
        <strong>ID: </strong>
        {props.language.id}
      </p>
      <p>
        <strong>Name: </strong>
        {props.language.name}
      </p>
      <p>
        <strong>Abbreviation: </strong>
        {props.language.abbreviation}
      </p>
      <p>
        <strong>Alphabet: </strong>
        {props.language.alphabet}
      </p>
      <p>
        <strong>Macrofamily: </strong>
        {props.language.macrofamily}
      </p>
      <p>
        <strong>Family: </strong>
        {props.language.family}
      </p>
      <p>
        <strong>Subfamily:</strong> {props.language.subfamily}
      </p>
      <p>
        <strong>Area 1: </strong>
        {props.language.area1}
      </p>
      <p>
        <strong>Area 2: </strong>
        {props.language.area2}
      </p>
      <p>
        <strong>Area 3: </strong>
        {props.language.area3}
      </p>
      <p>
        <strong>Alive: </strong>
        {props.language.alive === "f" || props.language.alive === false
          ? "false"
          : "true"}
      </p>
      <p>
        <strong>Notes: </strong>
        {props.language.notes}
      </p>
      <button
        onClick={(e) => props.onHandleEdit(e, props.language.id)}
        className="card-edit-btn"
      >
        Edit
      </button>
      <button
        onClick={(e) => props.onHandleDelete(e, props.language.id)}
        className="card-delete-btn"
      >
        Delete
      </button>
    </div>
  );
};

export default ViewAllLanguagesResultCard;
