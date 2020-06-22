import React from "react";
import axios from "../../utils";

import Meetings from "../../components/meetings/meetings.component";
import Requests from "../../components/requests/requests.component";
import "./meetings-requests-page.styles.scss";

class MeetingsRequestsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requested_date: "",
      requested_time: "",
      requested_method: "",
    };
  }

  render() {
    return (
      <div className="meetings-requests-page">
        <div className="meetings-container">
          <Meetings />
        </div>
        <div className="requests-container">
          <Requests />
        </div>
        <img
          className="goldlines"
          src={require("../../assets/img/goldlines.png")}
        />
      </div>
    );
  }
}

export default MeetingsRequestsPage;
