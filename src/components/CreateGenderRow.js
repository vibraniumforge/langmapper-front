import React, { Component } from "react";

class CreateGenderRow extends Component {
  render() {
    const { translation } = this.props;
    return (
      <tr key={translation.id}>
        <td>{translation.name}</td>
        <td>{translation.translation}</td>
        <td>{translation.romanization}</td>
        <td>{translation.gender}</td>
        <td>
          {translation.macrofamily === "Indo-European"
            ? "I.E."
            : translation.macrofamily}
        </td>
        <td>{translation.family}</td>
        <td>{translation.etymology ? translation.etymology : "None Found"}</td>
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
