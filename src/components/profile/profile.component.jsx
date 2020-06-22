import React, { useEffect, useState } from "react";

import "./profile.styles.scss";
import axios from "../../utils";

const Profile = (props) => {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [location, setLocation] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/profile/getUserProfile", {
        params: {
          token,
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          console.log(props);
          props.history.push("/");
        } else {
          setName(response.data.user.display_name);
          setImgUrl(response.data.user.profile_image_url);
          setLocation(response.data.user.home_city);
          setTechnologies(response.data.user.tech_languages);
          setExperience(response.data.user.experience);
        }
      });
  }, []);

  return (
    <div className="profile">
      <h1>Profile</h1>
      {imgUrl ? (
        <img className="profile-img" src={imgUrl} alt="profileImg" />
      ) : (
        <img
          className="profile-img"
          src={require("../../assets/img/default_profile_img.png")}
          alt="profileImg"
        />
      )}
      <div className="details">
        <h2>{name.charAt(0).toUpperCase() + name.substring(1)}</h2>
        <h2>From {location}</h2>
        <div className="small-wrapper">
          <h3>
            Tech Languages:{" "}
            <span>{technologies ? technologies.join(", ") : ""}</span>
          </h3>
          <h3>
            Years of Experience:<span> {experience}+</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
