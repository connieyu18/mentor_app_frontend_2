import React from "react";
import axios from "../../utils";
import { Button } from "antd";
import { Link } from "react-router-dom";

import "./friends.styles.scss";
class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friend_requests: [],
      confirmed_requests: [],
      user_name: "",
      imgUrl: "",
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
        let data = response.data.user.pending_friend_requests;
        let userName = response.data.user.display_name;
        let filteredFriendsRequests = data.filter(
          (e) => e.requester_name !== userName
        );
        let data2 = response.data.user.confirmed_friend_requests;
        let filteredConnected = data2.filter(
          (e) => e.requester_name !== userName
        );
        this.setState({
          friend_requests: filteredFriendsRequests,
          confirmed_requests: filteredConnected,
        });
      });
  }

  confirmFriend = (item, index, e) => {
    let {
      friend_id,
      friend_name,
      friend_request_id,
      requester_id,
      requester_name,
    } = item;
    let confirmFriendStatus = e.target.value;
    let token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/friend_request/confirm", {
        token,
        confirmFriendStatus,
        friend_request_id,
        requester_id,
        requester_name,
        friend_id,
        friend_name,
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    this.setState({
      friend_requests: this.state.friend_requests.filter(
        (e, idx) => idx != index
      ),
      confirmed_requests: [item, ...this.state.confirmed_requests],
    });
  };
  render() {
    return (
      <div className="friends">
        <div className="pending-requests-wrapper">
          <h2>Pending Friend Requests ({this.state.friend_requests.length})</h2>
          {this.state.friend_requests.length > 0 ? (
            <div className="gallery">
              {this.state.friend_requests.map((item, index) => (
                <div className="card-wrapper" key={index}>
                  {item.profile_image_url ? (
                    <img
                      className="profile-img"
                      src={item.profile_image_url}
                      alt="profileImg"
                    />
                  ) : (
                    <img
                      className="profile-img"
                      src={require("../../assets/img/default_profile_img.png")}
                      alt="profileImg"
                    />
                  )}

                  <h3 style={{ marginTop: "7px" }}>
                    {item.requester_name
                      ? item.requester_name.charAt(0).toUpperCase() +
                        item.requester_name.substring(1).toLowerCase()
                      : null}
                  </h3>
                  <p>
                    <Link
                      className="links"
                      to={{ pathname: `/user/${item.requester_id}/profile2` }}
                    >
                      <u>Profile</u>
                    </Link>
                    <br />
                    <Link
                      className="links"
                      to={{
                        pathname: `/user/${item.requester_name}/portfolio`,
                      }}
                    >
                      <u>See Projects</u>
                    </Link>
                  </p>
                  <div className="buttons">
                    <Button
                      className="button-friends"
                      size="small"
                      value="accept"
                      onClick={this.confirmFriend.bind(null, item, index)}
                      type="primary"
                    >
                      Add
                    </Button>
                    <Button
                      className="button-friends"
                      size="small"
                      value="decline"
                      onClick={this.confirmFriend.bind(null, item, index)}
                      type="primary"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h5>There are no pending friend requests.</h5>
          )}
        </div>
        <br />
        <div className="connections-wrapper">
          <h1>All your Connections ({this.state.confirmed_requests.length})</h1>
          {this.state.confirmed_requests.length > 0 ? (
            <div className="gallery">
              {this.state.confirmed_requests.map((item, index) => (
                <div className="card-wrapper" key={index}>
                  {item.profile_image_url ? (
                    <img
                      className="profile-img-connected"
                      src={item.profile_image_url}
                      alt="profileImg"
                    />
                  ) : (
                    <img
                      className="profile-img-connected"
                      src={require("../../assets/img/default_profile_img.png")}
                      alt="profileImg"
                    />
                  )}
                  <h4 style={{ marginTop: "7px" }}>
                    {item.requester_name
                      ? item.requester_name.charAt(0).toUpperCase() +
                        item.requester_name.substring(1).toLowerCase()
                      : null}
                  </h4>
                  <Link
                    className="link"
                    to={{ pathname: `/user/${item.requester_id}/profile2` }}
                  >
                    <u>View Profile</u>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flower-ring-background">
              <h3 className="text-small">No connections yet</h3>
              <img
                className="flower-img"
                src={require("../../assets/img/flower-ring.png")}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Friends;
