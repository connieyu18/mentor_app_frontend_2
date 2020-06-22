import React from "react";
import axios from "../../utils";
import { connect } from "react-redux";

import { setCurrentUser } from "../../redux/user/user.actions";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorEmail: "",
      errorPassword: "",
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.setCurrentUser({
      email,
      password,
    });
    if (email && password) {
      axios
        .post("http://localhost:5000/auth/sign-in", {
          email,
          password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.props.history.push("/user/profile");
        })
        .catch((error) => console.log("Something wrong with login" + error));
    } else if (!email || !password) {
      if (!email) {
        this.setState({
          errorEmail: "Email is Required",
        });
      }
      if (!password) {
        this.setState({
          errorPassword: "Password is Required",
        });
      }
    }
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            className="form-input"
            name="email"
            type="email"
            placeholder="Email"
            handleChange={this.handleChange}
            value={this.state.email.value}
            required
          />
          {this.state.errorEmail ? (
            <div className="error-message">{this.state.errorEmail}</div>
          ) : null}
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password.value}
            required
          />
          {this.state.errorPassword ? (
            <div className="error-message">{this.state.errorPassword}</div>
          ) : null}
          <div className="buttons">
            <CustomButton type="submit" onClick={this.handleSubmit}>
              Sign In
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(SignIn);
