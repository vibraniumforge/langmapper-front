import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../actions/userActions.js";

class Login extends Component {
  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <h3>Admin Logout</h3>
        <form onSubmit={this.handleOnSubmit}>
          <input type="submit" value="Logout" className="submit-btn" />
        </form>
      </>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout,
    },
    dispatch
  );
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
