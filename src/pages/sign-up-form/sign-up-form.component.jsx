import React from "react";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import { Route } from "react-router-dom";
import "./sign-up-form.styles.scss";
const SignUpFormPage = () => (
  <div className="sign-up-form-page">
    <div className="logoName">
      <h1>Mentor.I.U.</h1>
    </div>
    <Route SignUpForm path="/signup-form" component={SignUpForm} />
  </div>
);

export default SignUpFormPage;
