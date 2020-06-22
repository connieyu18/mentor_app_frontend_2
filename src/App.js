import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignUpForm from "./pages/sign-up-form/sign-up-form.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import UserPage from "./pages/user/user-page.component";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="wrapper block">
          <Switch>
            <Route exact path="/" component={SignInAndSignUpPage} />
            <Route path="/user" component={UserPage} />
            <Route exact path="/signup-form" component={SignUpForm} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
