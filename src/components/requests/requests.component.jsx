import React from "react";
import axios from "../../utils";
import { connect } from "react-redux";

import { addConfirmedMeeting } from "../../redux/meeting/meeting.actions";
import RequestCard from "../../components/request-card/request-card.component";
import { Button } from "antd";

import "./requests.styles.scss";

class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availabilities: [],
      display_name: "",
      request_date: "",
      request_time: "",
      method: "",
      home_city: "",
      tech_languages: [],
      experience: "",
      confirm_status: "",
      request_id: "",
      avail_creator: "",
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");

    axios({
      method: "get",
      url: "http://localhost:5000/availability/getRequests",
      headers: { authorization: token },
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        this.setState({
          availabilities: response.data.availabilities,
        });
      }
    });
  }

  submitConfirm = (i, index, item, e, event) => {
    const { requested_date, requested_time, sender_name } = item;
    const { method } = e;
    this.props.addConfirmedMeeting({
      requested_date,
      requested_time,
      sender_name,
      method,
    });
    let availabilities = [...this.state.availabilities];
    availabilities[index].meetings_requests.splice(i, 1);
    this.setState({ availabilities });
    let request_id = event.target.value;
    let token = localStorage.getItem("token");
    let confirm_status = event.target.name;
    axios
      .post("http://localhost:5000/request/confirmRequest", {
        confirm_status,
        token,
        request_id,
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="requests">
        <h1>See Upcoming Meeting Requests</h1>
        <p>Confirm your requests</p>
        <div className="small-title this-month">
          <div>
            {this.state.availabilities.length > 0 ? (
              this.state.availabilities
                .sort(
                  (a, b) =>
                    new Date(a.requested.date) - new Date(b.requested_date)
                )
                .map((e, index) => {
                  return (
                    <div key={index}>
                      {this.state.availabilities[index].meetings_requests.map(
                        (item, i) => {
                          return (
                            <div key={i} className="request-card">
                              <div className="request-img-container">
                                <div className="top-container">
                                  {/* FIXME: */}
                                  <img
                                    className="profile-img"
                                    src={
                                      "../../assets/img/default_profile_img.png"
                                    }
                                  />
                                  <h5>
                                    {item
                                      ? item.sender_name
                                          .charAt(0)
                                          .toUpperCase() +
                                        item.sender_name
                                          .substring(1)
                                          .toLowerCase()
                                      : null}
                                  </h5>
                                </div>

                                <div className="bottom-container">
                                  <p>
                                    <u>Meeting Details</u>
                                  </p>

                                  <p>
                                    Date: {item ? item.requested_date : null}{" "}
                                  </p>
                                  <p>
                                    Time: {item ? item.requested_time : null}
                                  </p>
                                  <p>
                                    Meeting Method:{" "}
                                    {e
                                      ? e.method.charAt(0).toUpperCase() +
                                        e.method.substring(1).toLowerCase()
                                      : null}
                                  </p>
                                </div>
                              </div>
                              <div className="request-info-container">
                                <h5>
                                  <u>Profile</u>
                                </h5>
                                <p>Location: {item.sender_home_city}</p>
                                <p>Tech Languages: {item.sender_tech_lang}</p>
                                <p>
                                  Years of Experience: {item.sender_experience}+
                                </p>
                                <Button
                                  onClick={this.submitConfirm.bind(
                                    null,
                                    i,
                                    index,
                                    item,
                                    e
                                  )}
                                  value={item._id}
                                  name="confirm"
                                  size="small"
                                  type="primary"
                                >
                                  Confirm
                                </Button>
                                <Button
                                  onClick={this.submitConfirm.bind(
                                    null,
                                    i,
                                    index,
                                    item,
                                    e
                                  )}
                                  value={item._id}
                                  name="decline"
                                  size="small"
                                  type="primary"
                                >
                                  Decline
                                </Button>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  );
                })
            ) : (
              <h3 className="text-center">No requests yet</h3>
            )}
          </div>
        </div>
        <img
          className="flower-right"
          src={require("../../assets/img/flower.png")}
        />
        <h3></h3>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addConfirmedMeeting: (meeting) => dispatch(addConfirmedMeeting(meeting)),
});
export default connect(null, mapDispatchToProps)(Requests);
