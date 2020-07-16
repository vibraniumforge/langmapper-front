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
        <form id="logout-form" onSubmit={this.handleOnSubmit}>
          <h2>Admin Logout</h2>
          <div className="full-col">
            <input type="submit" value="Logout" className="logout-btn" />
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
