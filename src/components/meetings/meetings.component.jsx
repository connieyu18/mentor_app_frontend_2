import React from "react";
import axios from "../../utils";
import { connect } from "react-redux";

import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import MeetingsCard from "../meetings-card/meeting-cards.component";
import CalendarComponent from "../calendar/calendar.component";

import "antd/dist/antd.css";
import "./meetings.styles.scss";

class Meetings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed_meetings: [],
      user_name: "",
      filtered: [],
      new_meeting: {},
    };
    this.source = null;
    this.menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="01">January</Menu.Item>
        <Menu.Item key="02">February</Menu.Item>
        <Menu.Item key="03">March</Menu.Item>
        <Menu.Item key="04">April</Menu.Item>
        <Menu.Item key="05">May</Menu.Item>
        <Menu.Item key="06">June</Menu.Item>
        <Menu.Item key="07">July</Menu.Item>
        <Menu.Item key="08">August</Menu.Item>
        <Menu.Item key="09">September</Menu.Item>
        <Menu.Item key="10">October</Menu.Item>
        <Menu.Item key="11">November</Menu.Item>
        <Menu.Item key="12">December</Menu.Item>
      </Menu>
    );
  }

  componentDidMount() {
    const { meetings_confirmed } = this.props;
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
        } else {
          let today = new Date();
          let filteredConfirmed = [...response.data.user.confirmed_meetings]
            .filter((e) => new Date(e.requested_date) >= today)
            .sort((a, b) => a.requested_date - b.requested_date);
          let new_meeting = filteredConfirmed[0];
          this.setState({
            confirmed_meetings: filteredConfirmed,
            user_name: response.data.user.display_name,
            new_meeting: new_meeting,
          });
        }
      });
  }
  componentWillMount() {
    this.setState({
      confirmed_meetings: this.state.confirmed_meetings,
      filtered: this.state.confirmed_meetings,
    });
  }
  handleMenuClick = (e) => {
    const month = e.key;
    let filtered = this.state.confirmed_meetings.filter(
      (e) => e.requested_date.substring(0, 2) === month
    );
    this.setState({
      filtered,
    });
  };

  render() {
    const { user_name, new_meeting } = this.state;
    return (
      <div className="meetings">
        <h1>Meetings</h1>
        <div className="confirmed-container">
          <div className="new-meeting">
            <h4>Upcoming Meeting</h4>
            {new_meeting ? (
              <p>
                Request By:{" "}
                {new_meeting.sender_name
                  ? new_meeting.sender_name.charAt(0).toUpperCase() +
                    new_meeting.sender_name.substring(1).toLowerCase()
                  : "N/A"}
                <br />
                Request Date:{" "}
                {new_meeting.requested_date
                  ? new_meeting.requested_date
                  : "N/A"}
                <br />
                Request Time:{" "}
                {new_meeting.requested_time
                  ? new_meeting.requested_time
                  : "N/A"}
                <br />
                Meeting Method:{" "}
                {new_meeting.method ? new_meeting.method : "N/A"}
                <br />
              </p>
            ) : (
              <p>No Meetings Yet!</p>
            )}
          </div>
          <h2>Select a month to show your confirmed meetings</h2>
          <div className="button-dropdown">
            <Dropdown overlay={this.menu}>
              <Button style={{ width: "150px" }}>
                Month <DownOutlined />
              </Button>
            </Dropdown>{" "}
          </div>
          <br />
          <br />
          {this.state.filtered.length == this.state.confirmed_meetings.length
            ? this.state.confirmed_meetings.map((item, index) => (
                <MeetingsCard
                  key={index}
                  user_name={user_name}
                  confirmed_meetings={item}
                />
              ))
            : this.state.filtered.map((item, index) => (
                <MeetingsCard
                  key={index}
                  user_name={user_name}
                  confirmed_meetings={item}
                />
              ))}
        </div>
        <div className="pending-meetings"></div>
        <div className="calendar">
          <h1>Calendar</h1>
          <CalendarComponent />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ meeting }) => ({
  meetings_confirmed: meeting.meetings_confirmed,
});

export default connect(mapStateToProps)(Meetings);
