import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../utils";

import Background from "../../../assets/img/default_profile_img.png";

import { Icon } from "semantic-ui-react";

import "./card.styles.scss";

const Card = (props) => {
  const [isDisabled, setDisabled] = useState("");
  let {
    imgUrl,
    _id,
    profile_type,
    display_name,
    home_city,
    tech_languages,
    experience,
  } = props;

  const submit = () => {
    setDisabled(!isDisabled);
    let friend_id = _id;
    let token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/friend_request/add", {
        token,
        friend_id,
        display_name,
      })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };
  return (
    <div className="card-wrapper">
      <div className="collection-item">
        {imgUrl ? (
          <div
            className="image"
            style={{ backgroundImage: `url("${imgUrl}")` }}
          />
        ) : (
          <div
            className="image"
            style={{ backgroundImage: `url("${Background}")` }}
          />
        )}

        <div className="collection-footer">
          <p className="display_name">
            {display_name.charAt(0).toUpperCase() + display_name.substring(1)}
          </p>
          <p className="display_details">
            <Icon
              disabled
              size="large"
              color="blue"
              name="address card outline"
            />
            Based in {home_city}
          </p>
          <p className="display_details">
            <Icon disabled size="large" color="blue" name="laptop" />
            {tech_languages ? tech_languages.join(", ") : "N/A"}
          </p>
          <p className="display_details">
            <Icon disabled size="large" color="blue" name="user outline" />
            Years of Experience: {experience}
          </p>
          <p className="display_details">
            <Icon disabled size="large" color="blue" name="user outline" />
            Role: {profile_type}
          </p>
          <p>
            <Link to={{ pathname: `/user/${_id}/profile2` }}>
              {" "}
              <Icon disabled size="large" color="blue" name="folder outline" />
              <u> Send a meeting request</u>
            </Link>
          </p>
          <p>
            <Link to={{ pathname: `/user/${display_name}/portfolio` }}>
              {" "}
              <Icon disabled size="large" color="blue" name="coffee" />
              <u> See Projects</u>
            </Link>
          </p>

          {!isDisabled ? (
            <button className="custom-button" onClick={submit}>
              Connect
            </button>
          ) : (
            <button
              className="custom-button"
              style={{ display: "block" }}
              onClick={submit}
            >
              Connected
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;
