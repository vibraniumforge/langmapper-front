import React from "react";

const EditAndDeleteButtons = (props) => {
  return (
    <>
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
      </button>{" "}
    </>
  );
};

export default EditAndDeleteButtons;
