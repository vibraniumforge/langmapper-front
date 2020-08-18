import React from "react";

const MiniTable = (props) => {
  return (
    <>
      <table id="table-title">
        <thead>
          <tr>
            {props.searchedArea ? <th>Area</th> : null}
            {props.searchedMacrofamily ? <th>Macrofamily</th> : null}
            {props.searchedLanguage ? <th>Language</th> : null}
            {props.searchedWord ? <th>Word</th> : null}
            {props.wordDefinition ? <th>Definition</th> : null}
            {props.count ? <th>Count</th> : null}
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.searchedArea ? <td>{props.searchedArea}</td> : null}
            {props.searchedMacrofamily ? (
              <td>{props.searchedMacrofamily}</td>
            ) : null}
            {props.searchedLanguage ? <td>{props.searchedLanguage}</td> : null}
            {props.searchedWord ? <td>{props.searchedWord}</td> : null}
            {props.wordDefinition ? <td>{props.wordDefinition}</td> : null}
            {props.count ? <td>{props.count}</td> : null}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MiniTable;
