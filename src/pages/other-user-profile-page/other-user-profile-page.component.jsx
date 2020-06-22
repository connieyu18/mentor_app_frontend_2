import React from "react";
import axios from "../../utils";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { Table, Button, DatePicker, TimePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import moment from "moment";

import "./other-user-profile-page.styles.scss";
const columns = [
  {
    title: "Availability Dates",
    dataIndex: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
  },
  {
    title: "Method",
    dataIndex: "method",
  },
  {
    title: "Select a date",
    dataIndex: "selectDate",
  },
  {
    title: "Select a time",
    dataIndex: "selectTime",
  },
  {
    title: "Action",
    dataIndex: "submit",
  },
];

const data = [];

class OtherUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      display_name: "",
      home_city: "",
      tech_languages: [],
      experience: "",
      profile_type: "",
      availabilities: [],
      requested_time: "",
      requested_date: "",
      availability_id: "",
      isDisabled: true,
      loading: false,
      profile_image_url: "",
      recipient_id: this.props.match.params._id,
    };
  }
  componentDidMount() {
    let _id = this.props.match.params._id;
    axios
      .get("http://localhost:5000/profile/getOtherUserProfile", {
        params: {
          _id,
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          if (
            response.data.user ||
            response.data.user.availabilities.length > 0
          ) {
            const data1 = [...response.data.user.availabilities];
            for (let i = 0; i < data1.length; i++) {
              data.push({
                key: { i },
                date:
                  data1[i].start_date || data1[i].start_date !== null
                    ? `${data1[i].start_date}-${data1[i].end_date}`
                    : "N/A",
                time: data1[i].start_time
                  ? `${data1[i].start_time}-${data1[i].end_time}`
                  : "N/A",
                method: data1[i].method ? `${data1[i].method}` : "N/A",
                selectDate: (
                  <DatePicker
                    name="requested_date"
                    format="MM/DD/YYYY"
                    separator="-"
                    allowEmpty="[false]"
                    disabledDate={this.disabledDate}
                    placeholder="Select Date"
                    onChange={this.selectDate}
                  />
                ),
                selectTime: (
                  <TimePicker
                    use12Hours
                    name="requested_time"
                    placeholder="Start Time"
                    format="h:mm a"
                    minuteStep={5}
                    onOk={false}
                    onChange={this.selectTime}
                  />
                ),
                submit: (
                  <Button
                    type="primary"
                    className={this.state.loading ? "disabled" : ""}
                    onClick={this.submitSelections}
                    value={data1[i]._id}
                    // disabled={this.state.isDisabled}
                    // disabled
                  >
                    Submit
                  </Button>
                ),
              });
            }
            this.setState({
              user: response.data.user,
              availabilities: data,
            });
          } else {
            console.log("no availabilities");
          }
        }
      });
  }

  //   disabledDate = (current) => {
  //       console.log("current"+current)
  //     let customDate = "2020-04-02";
  //     return current && current< moment(customDate, "YYYY-MM-DD");
  // }

  //   disabledDate = (current) => {
  //     let customDate = "2018-11-25";
  //     return current && current< moment(customDate, "YYYY-MM-DD");
  // }

  //   disabledDate=(current)=> {
  //       const {availability_id}= this.state;
  //       axios({
  //           method: "get",
  //           url: "http://localhost:5000/availability/getRequestedDateTime",
  //           headers: { availability_id:availability_id }
  //         }).then(res=>console.log(res.data))
  //         .catch(err=>console.log(err))
  //   // Can not select days before today and today
  //   return current && current < moment().endOf('day');
  // }

  onSelectChange = (selectedRowKeys, event) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  selectTime = (value, timeString) => {
    this.setState(
      {
        requested_time: timeString,
      },
      () => console.log("timeString" + this.state.requested_time)
    );
  };
  selectDate = (value, dateString) => {
    this.setState(
      {
        requested_date: dateString,
      },
      () => console.log("dateString" + this.state.requested_date)
    );
  };

  submitSelections = (event) => {
    if (this.state.loading) {
      event.preventDefault();
      return false;
    } else {
      //     this.setState({
      //   isDisabled: true
      // },()=>console.log("isDisabled", this.state.isDisabled));
      let availability_id = event.target.value;
      let token = localStorage.getItem("token"); //token- user ID, not the other persons
      console.log("Token" + token);
      const { requested_date, requested_time, recipient_id } = this.state;
      axios
        .post("http://localhost:5000/request/create-request", {
          requested_date,
          requested_time,
          recipient_id,
          token,
          availability_id,
        })
        .then((response) => {
          console.log("RESSS" + response.data.user);
        })
        .catch((err) => console.log("error"));
      let data2 = [];
      let data1 = [...this.state.availabilities];
      console.log("DATA!!!" + JSON.stringify(data1));
      for (let i = 0; i < data1.length; i++) {
        data2.push({
          key: { i },
          date:
            data1[i].date || data1[i].date !== null
              ? `${data1[i].date}`
              : "N/A",
          time: data1[i].date ? `${data1[i].date}` : "N/A",
          method: data1[i].method ? `${data1[i].method}` : "N/A",
          selectDate: (
            <DatePicker
              name="requested_date"
              format="MM/DD/YYYY"
              separator="-"
              allowEmpty="[false]"
              disabledDate={this.disabledDate}
              placeholder="Select Date"
              onChange={this.selectDate}
            />
          ),
          selectTime: (
            <TimePicker
              use12Hours
              name="requested_time"
              placeholder="Start Time"
              format="h:mm a"
              minuteStep={5}
              onOk={false}
              onChange={this.selectTime}
            />
          ),
          submit: (
            <p>Submitted</p>
            // <Button
            //   type="primary"
            //   className={this.state.loading ? 'disabled' : ''}
            //   onClick={()=>!this.state.loading}
            //   value={i}
            //   disabled={true}
            //   // disabled={this.state.isDisabled}
            //   // disabled
            // >
            //   Submit
            // </Button>
          ),
        });
      }
      this.setState({
        availabilities: data2,
        loading: false,
      });
    }
  };

  render() {
    const { availabilities, user } = this.state;

    return (
      <div className="profile-page">
        <div className="profile-info-container">
          <div className="profile">
            <h2>
              {user.profile_type
                ? user.profile_type.charAt(0).toUpperCase() +
                  user.profile_type.substring(1)
                : ""}
            </h2>
            {user.profile_image_url ? (
              <img
                className="profile-img"
                src={user.profile_image_url}
                alt="profileImg"
              />
            ) : (
              <img
                className="profile-img"
                src={require("../../assets/img/default_profile_img.png")}
                alt="profileImg"
              />
            )}
            <h2>
              {user.display_name
                ? user.display_name.charAt(0).toUpperCase() +
                  user.display_name.substring(1).toLowerCase()
                : ""}
            </h2>
            <h3>From {user.home_city}</h3>
            <div className="small-wrapper">
              <h3>
                Tech Languages:{" "}
                <span>
                  {user.tech_languages ? user.tech_languages.join(", ") : ""}
                </span>
              </h3>
              <h3>
                Years of Experience:
                <span> {user.experience ? user.experience : ""}</span>
              </h3>
              <h3>
                <Link to={{ pathname: `/user/${user.display_name}/portfolio` }}>
                  {" "}
                  <Icon
                    disabled
                    size="large"
                    color="blue"
                    name="user outlined"
                  />
                  <u> See Projects</u>
                </Link>
              </h3>
            </div>
          </div>
        </div>
        <div className="availabilities-container">
          <h1>Request for a meeting</h1>
          <Table columns={columns} dataSource={availabilities} />
        </div>
        <img
          className="flower-right"
          src={require("../../assets/img/flower.png")}
        />
        <img
          className="leaves-right-1"
          style={{ bottom: "0" }}
          src={require("../../assets/img/leaves.png")}
        />
      </div>
    );
  }
}

export default OtherUserProfile;
