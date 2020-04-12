import React, { Component } from "react";
import { genderHelper, genderColorHelper } from "../helpers/genderHelper.js";

class CreateGenderRow extends Component {
  render() {
    const { translation } = this.props;
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
        <td className={genderColorHelper(translation.gender)}>
          {genderHelper(translation.macrofamily, translation.name)
            ? translation.gender
            : "-"}
        </td>
        <td className="table-etymology">
          {translation.etymology ? translation.etymology : "None Found"}
        </td>
        {/* <td>
          <button
            onClick={e => this.props.onHandleEdit(e, translation.t_id)}
            className="table-edit-btn"
          >
            Edit
          </button>
        </td> */}
      </tr>
    );
  }
}
export default CreateGenderRow;
