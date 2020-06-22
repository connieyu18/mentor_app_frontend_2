import React from "react";
import { Route } from "react-router-dom";
import "./sign-in-and-sign-up.styles.scss";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
///should be called Sign in and Sign up component
import SignUpForm from "../sign-up-form/sign-up-form.component";

const SignInAndSignUpPage = () => (
  <div className="main-wrapper">
    <img
      className="leaves-left"
      src={require("../../assets/img/leafs-left.png")}
    />
    <img className="logo" src={require("../../assets/img/MentorLogo.png")} />
    <img
      className="girl-img"
      src={require("../../assets/img/girlsitting.png")}
    />
    <h5>Mentor.I.U.</h5>
    <p>Connecting more Young Women and Minorities in Tech </p>
    <div className="sign-in-and-sign-up">
      <Route path="/" component={SignIn} />
      <Route path="/" component={SignUp} />
    </div>
    <img className="leaves" src={require("../../assets/img/leaves.png")} />
  </div>
);

export default SignInAndSignUpPage;
