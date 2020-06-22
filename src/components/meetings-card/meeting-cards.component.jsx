import React from "react";

import "./meeting-cards.styles.scss";

const MeetingsCard = (props) => {
  const {
    sender_name,
    sender_home_city,
    requested_date,
    requested_time,
    method,
    avail_creator,
  } = props.confirmed_meetings;

  return (
    <div className="meetings-card">
      <img
        className="profile-img"
        src={require("../../assets/img/my-profile-img.jpg")}
      />
      <div className="info">
        <p>
          <span>Meeting with:</span>{" "}
          {props.user_name == sender_name
            ? avail_creator.charAt(0).toUpperCase() +
              avail_creator.substring(1).toLowerCase()
            : sender_name.charAt(0).toUpperCase() +
              sender_name.substring(1).toLowerCase()}{" "}
        </p>
        <p>
          <span>Request by:</span>{" "}
          {props.user_name == sender_name
            ? "you"
            : sender_name.charAt(0).toUpperCase() +
              sender_name.substring(1).toLowerCase()}
        </p>
        <p>
          <span>Location: </span>
          {sender_home_city}
        </p>
        <p>
          <span>Date: </span>
          {requested_date}
        </p>
        <p>
          <span>Time: </span>
          {requested_time}
        </p>
        <p>
          <span>Meeting Method: </span>
          {method}
        </p>
        <p>
          <span>Status: </span> Confirmed
        </p>
      </div>
    </div>
  );
};

export default MeetingsCard;
