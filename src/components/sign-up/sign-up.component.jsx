import React from "react";
import axios from "../../utils";
import { connect } from "react-redux";

import { setCurrentUser } from "../../redux/user/user.actions";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
      email: "",
      password: "",
      confirm_password: "",
      error: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { display_name, email, password, confirm_password } = this.state;
    this.props.setCurrentUser({
      display_name,
      email,
      password,
      confirm_password,
    });
    //TODO:come back to implement the bcrypt
    axios
      .post("http://localhost:5000/auth/signup", {
        display_name,
        email,
        password,
      })
      .then((response) => {
        if (response.data.error) {
          // TODO: tooltip
          this.setState({ error: response.data.error });
        } else {
          localStorage.setItem("token", response.data.token);
          this.props.history.push("/signup-form");
        }
      })
      .catch((err) =>
        this.setState({ error: "There was something wrong with registration" })
      );
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { display_name, email, password, confirm_password } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="display_name"
            placeholder="Display Name"
            value={display_name}
            onChange={this.handleChange}
            required
          />
          {this.state.error}
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
            required
          />

          <FormInput
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={this.handleChange}
            placeholder="Confirm Password"
            required
          />

          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(SignUp);
