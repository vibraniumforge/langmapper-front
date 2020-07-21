import React from "react";
import {
  genderFormatHelper,
  genderColorHelper,
} from "../helpers/genderHelper.js";
import { etymologyFormatHelper } from "../helpers/etymologyFormatHelpler.js";
import EditAndDeleteButtons from "./EditAndDeleteButtons.js";
import WiktionaryLink from "./WiktionaryLink.js";
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
        <strong>
          {genderFormatHelper(
            translation.macrofamily,
            translation.name,
            translation.gender
          )}
        </strong>
      </td>
      <td className="">
        {translation.etymology
          ? etymologyFormatHelper(translation.etymology)
          : "None Found"}
        {translation.etymology ? (
          <WiktionaryLink link={translation.link} />
        ) : null}
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
