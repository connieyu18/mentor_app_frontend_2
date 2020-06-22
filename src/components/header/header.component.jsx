import React from "react";
import axios from "../../utils";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";

import "./header.styles.scss";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionDiv,
  OptionLink,
} from "./header.styles.jsx";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/profile/getUserProfile", {
        params: {
          token,
        },
      })
      .then((response) => {
        this.setState({
          display_name: response.data.user.display_name,
        });
      });
  }

  logOut = (e) => {
    localStorage.clear();
    this.props.setCurrentUser(null);
  };
  render() {
    const { display_name } = this.state;
    return (
      <div className="header">
        <div className="logo-container">
          <h1 style={{ color: "black" }} id="logo-name">
            Mentor.I.U
          </h1>
        </div>
        <div className="options clear">
          <div className="option">
            <Link className="link" to="/user/portfolio">
              Portfolio{" "}
            </Link>
          </div>
          <div className="option">
            {" "}
            <Link className="link" to="/user/search">
              Search
            </Link>{" "}
          </div>
          <div className="option">
            {" "}
            <Link className="link" to="/user/add-availability">
              Add an availability{" "}
            </Link>
          </div>

          <div className="option">
            {" "}
            <Link className="link" to="/user/meetings-requests">
              Meetings/ Requests
            </Link>{" "}
          </div>
          <div className="option">
            {" "}
            <Link className="link" to="/user/profile">
              Profile
            </Link>{" "}
          </div>
          <div className="option">
            <Link className="link" onClick={this.logOut} to="/">
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(Header);
