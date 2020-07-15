import React, { Component } from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import LoginForm from "../forms/LoginForm.js";
import LogoutForm from "../forms/LogoutForm.js";

class Login extends Component {
  render() {
    return (
      <div>
        <p>{this.props.loggedIn ? "Logged in" : "Not logged in"}</p>
        {this.props.loggedIn ? <LogoutForm /> : <LoginForm />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.users.loggedIn,
});

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       loginUser,
//     },
//     dispatch
//   );
// };

export default withRouter(connect(mapStateToProps, null)(Login));
