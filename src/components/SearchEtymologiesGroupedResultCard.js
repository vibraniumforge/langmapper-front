import React from "react";
import { etymologyFormatHelper } from "../helpers/etymologyFormatHelpler.js";
import EditAndDeleteButtons from "./EditAndDeleteButtons";
import { connect } from "react-redux";

export const SearchEtymologiesGroupedResultCard = (props) => {
  return (
    <div className="group-etymology-result-card">
      <p>
        <strong>Languages: </strong>
        {this.props.result[1].join(", ")}
      </p>
      <p>
        <strong>Etymology: </strong>
        {etymologyFormatHelper(props.translation.etymology)}
      </p>
      {props.loggedIn ? (
        <>
          <EditAndDeleteButtons
            onHandleEdit={props.onHandleEdit}
            onHandleDelete={props.onHandleDelete}
            translation={props.translation}
          />
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});

export default connect(
  mapStateToProps,
  null
)(SearchEtymologiesGroupedResultCard);
