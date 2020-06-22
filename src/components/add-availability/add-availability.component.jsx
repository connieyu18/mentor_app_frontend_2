import React from "react";
import axios from "../../utils";

import "antd/dist/antd.css";
import "react-google-flight-datepicker/dist/main.css";
import "./add-availability.styles.scss";

import CustomButton from "../../components/custom-button/custom-button.component";
import DataTable from "../../components/data-table/data-table.component";

import { TimePicker } from "antd";
import { DatePicker } from "antd";
import { Dropdown, Form } from "semantic-ui-react";
const { RangePicker } = DatePicker;

class AddAvailability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: "",
      end_date: "",
      date: [],
      start_time: "",
      end_time: "",
      method: "",
      error: "",
      newData: null,
    };
  }

  onChangeDate = (value, dateString) => {
    let { start_date, end_date } = this.state;
    this.setState({ start_date: dateString[0], end_date: dateString[1] });
  };

  onChangeStartTime = (value, timeString) => {
    this.setState({
      start_time: timeString,
    });
  };

  onChangeEndTime = (value, timeString) => {
    this.setState({
      end_time: timeString,
    });
  };
  disabledTime = (current) => {
    if (this.state.start_time > current) {
      return false;
    }
    return true;
  };

  handleChange = (e, formInputs) => {
    if (formInputs) {
      const { value, name } = formInputs;
      this.setState({
        [name]: value,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    const { method, start_date, end_date, start_time, end_time } = this.state;
    axios
      .post("http://localhost:5000/availability/create", {
        token,
        method,
        start_date,
        end_date,
        start_time,
        end_time,
      })
      .then((response) => {
        this.setState({ newData: response.data.avail });
      })
      .catch((err) =>
        this.setState({
          error: "There was something wrong with adding an availability",
        })
      );
  };

  render() {
    const { start_time, end_time } = this.state;
    return (
      <div className="add-availability">
        <div className="add-container">
          <h1>Add Your Availability</h1>
          <Form onSubmit={this.handleSubmit}>
            <h3>Select a start and end date</h3>
            <RangePicker
              allowClear={true}
              format="MM/DD/YYYY"
              separator="-"
              onChange={this.onChangeDate}
              allowEmpty="[true, true]"
              onOk={this.onOk}
            />
            <br />
            <br />
            <h3>Select a start and end time</h3>
            {end_time && start_time > end_time ? (
              <span className="error-message">
                "Please select a later time"
              </span>
            ) : (
              ""
            )}
            <div className="time-picker">
              <TimePicker
                use12Hours
                name="start_time"
                placeholder="Start Time"
                format="h:mm a"
                minuteStep={5}
                onOk={false}
                onChange={this.onChangeStartTime}
              />

              <TimePicker
                use12Hours
                name="end_time"
                placeholder="End Time"
                format="h:mm a"
                minuteStep={5}
                disableTime={this.disabledTime}
                onChange={this.onChangeEndTime}
              />
            </div>
            <br />
            <br />
            <h3>Select how you would like to set up a meeting</h3>
            <Dropdown
              name="method"
              placeholder="Choose one"
              onChange={this.handleChange}
              fluid
              required
              selection
              options={[
                { key: "coffee", text: "Coffee (In Person)", value: "coffee" },
                { key: "virtual", text: "virtual", value: "virtual" },
              ]}
            />
            <CustomButton style={{ margin: "30px auto" }} type="submit">
              Submit
            </CustomButton>
          </Form>
        </div>
        <div className="display-container">
          <h1>Your Availabilities</h1>
          <DataTable newData={this.state.newData} />
        </div>
        <img
          className="students-img"
          src={require("../../assets/img/students.png")}
        />
        <img
          className="leaves-left-1"
          src={require("../../assets/img/leafs-left.png")}
        />
      </div>
    );
  }
}

export default AddAvailability;
