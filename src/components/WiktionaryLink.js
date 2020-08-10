import React from "react";

const WiktionaryLink = (props) => {
  return (
    <>
      {/* <strong>
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          Wiktionary
        </a>
      </strong>
      <img
        src={require("../images/wiktionary.ico")}
        alt="icon"
        className="wiktionary-icon"
      /> */}
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <img
          src={require("../images/wiktionary.ico")}
          alt="icon"
          className="wiktionary-icon"
        />
      </a>
    </>
  );
};

export default WiktionaryLink;
