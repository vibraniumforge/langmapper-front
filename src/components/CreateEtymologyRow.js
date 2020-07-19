import React from "react";
import { genderHelper, genderColorHelper } from "../helpers/genderHelper.js";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import { connect } from "react-redux";

const CreateEtymologyRow = (props) => {
  const { translation } = props;
  return (
    <tr key={translation.id}>
      <td>{translation.name}</td>
      <td>
        {translation.macrofamily === "Indo-European"
          ? "I.E."
          : translation.macrofamily}
      </td>
      <td>{translation.family}</td>
      <td>{translation.translation}</td>
      <td>
        {translation.translation === translation.romanization
          ? null
          : translation.romanization}
      </td>
      <td
        className={
          genderColorHelper(
            translation.macrofamily,
            translation.name,
            translation.gender
          ) + "-result"
        }
      >
        {genderHelper(
          translation.macrofamily,
          translation.name,
          translation.gender
        )}
      </td>
      <td className="table-etymology">
        {translation.etymology ? translation.etymology : "None Found"}
      </td>
      <td>
        {props.loggedIn ? (
          <>
            <EditAndDeleteButtons
              onHandleEdit={props.onHandleEdit}
              onHandleDelete={props.onHandleDelete}
              translation={props.translation}
            />
          </>
        ) : null}
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});

export default connect(mapStateToProps, null)(CreateEtymologyRow);
