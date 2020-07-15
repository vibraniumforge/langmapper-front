import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../actions/userActions.js";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state.username, this.state.password);
    // this.props.history.push("/search_translations");
    this.setState({
      username: "",
      password: "",
    });
  };

  render() {
    return (
      <>
        <h3>Admin Login</h3>
        {/* <p>{this.props.loggedIn ? "Logged in" : "Not logged in"}</p> */}
        <form
          onSubmit={(e) =>
            this.handleOnSubmit(e, this.state.username, this.state.password)
          }
        >
          <div>
            <label className="same-line" htmlFor="username">
              Username:{" "}
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleOnChange}
              className=""
            />
          </div>
          <div>
            <label className="same-line" htmlFor="password">
              Password:{" "}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleOnChange}
              className=""
            />
          </div>
          <input type="submit" value="Submit" className="submit-btn" />
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
      loginUser,
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
