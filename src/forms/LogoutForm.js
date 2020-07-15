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
        {/* <p>{this.props.loggedIn ? "Logged in" : "Not logged in"}</p> */}
        <form onSubmit={this.handleOnSubmit}>
          <input type="submit" value="Logout" className="submit-btn" />
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
