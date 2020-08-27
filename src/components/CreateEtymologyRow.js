import React from "react";
import {
  genderFormatHelper,
  genderColorHelper,
  genderBoldHelper,
} from "../helpers/genderFormatHelper.js";
import { etymologyFormatHelper } from "../helpers/etymologyFormatHelpler.js";
import { languageFormatHelper } from "../helpers/languageFormatHelper.js";
import EditAndDeleteButtons from "./EditAndDeleteButtons.js";
import WiktionaryLink from "./WiktionaryLink.js";
import { connect } from "react-redux";

const CreateEtymologyRow = (props) => {
  const { translation } = props;
  return (
    <tr key={translation.id}>
      <td>{translation.name}</td>
      <td>
        {languageFormatHelper(translation.macrofamily, translation.family)}
      </td>
      {/* <td>{translation.translation}</td>
      <td>
        {translation.translation === translation.romanization
          ? null
          : translation.romanization}
      </td> */}
      <td>
        {translation.translation === translation.romanization
          ? translation.translation
          : `${translation.translation} - ${translation.romanization}`}
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
        {genderBoldHelper(translation.gender) ? (
          <strong>
            {genderFormatHelper(
              translation.macrofamily,
              translation.name,
              translation.gender
            )}
          </strong>
        ) : (
          <p>
            {genderFormatHelper(
              translation.macrofamily,
              translation.name,
              translation.gender
            )}
          </p>
        )}
      </td>
      <td className="">
        {translation.etymology
          ? etymologyFormatHelper(translation.etymology)
          : "None Found"}
      </td>
      <td>
        <WiktionaryLink link={translation.link} />
      </td>
      {/* <td>
        {translation.etymology ? (
          <WiktionaryLink link={translation.link} />
        ) : null}
      </td> */}

      {props.loggedIn ? (
        <td>
          <EditAndDeleteButtons
            onHandleEdit={props.onHandleEdit}
            onHandleDelete={props.onHandleDelete}
            translation={props.translation}
          />
        </td>
      ) : null}
    </tr>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});

export default connect(mapStateToProps, null)(CreateEtymologyRow);
