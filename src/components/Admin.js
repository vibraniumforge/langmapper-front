import React, { Component } from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import LoginForm from "../forms/LoginForm.js";
import LogoutForm from "../forms/LogoutForm.js";

class Login extends Component {
  render() {
    return <>{this.props.loggedIn ? <LogoutForm /> : <LoginForm />}</>;
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
