import React from "react";
import axios from "../../utils";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { storage } from "../../firebase/index.js";

import { setCurrentUser } from "../../redux/user/user.actions";

import CustomButton from "../../components/custom-button/custom-button.component";
import CityList from "../../city-list";

import { Button, Form, Dropdown } from "semantic-ui-react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import "./sign-up-form.styles.scss";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_type: "",
      tech_languages: [],
      home_city: "",
      experience: "",
      currentUser: "",
      validationError: "",
      isTouched: false,
      errorMsg: "",
      img_url: "",
    };
  }

  handleChange = (e, formInputs) => {
    if (formInputs) {
      const { value, name } = formInputs;
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleSetTouched = (formInputs) => {};

  handleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    const {
      profile_type,
      tech_languages,
      img_url,
      home_city,
      experience,
    } = this.state;
    this.props.setCurrentUser({
      profile_type,
      tech_languages,
      home_city,
      experience,
      img_url,
      token,
    });
    axios
      .put("http://localhost:5000/auth/signupform", {
        token,
        profile_type,
        tech_languages,
        home_city,
        experience,
        img_url,
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          this.props.history.push("/");
        } else {
          localStorage.setItem("token", response.data.token);
          this.props.history.push("/user/profile");
        }
      })
      .catch((err) => {
        this.props.history.push("/");
      });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  //new
  handleFileChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        let token = localStorage.getItem("token");
        axios
          .get("http://localhost:5000/profile/getUserProfile", {
            params: {
              token,
            },
          })
          .then((response) => {
            let uploadTask = storage
              .ref(`images/${response.data.user._id}`)
              .putString(imageUrl, "data_url", { contentType: "image/jpg" });
            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                console.log(error);
              },
              () => {
                storage
                  .ref("images")
                  .child(response.data.user._id)
                  .getDownloadURL()
                  .then((url) => {
                    console.log("DDDD" + url);
                    this.setState({
                      img_url: url,
                    });
                  });
              }
            );
          });
      });
    }
  };

  render() {
    const {
      profile_type,
      isTouched,
      tech_languages,
      home_city,
      experience,
      validationError,
      img_url,
    } = this.state;
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="sign-up-form">
        <h1>Next Steps</h1>
        <Form ref="form" onSubmit={this.handleSubmit}>
          <Form.Field required>
            <h3>Are you a mentor or trainee?</h3>
            <span className="error-message">
              {this.state.profile_type ? "" : " This field is required"}
            </span>
            <Dropdown
              name="profile_type"
              placeholder="Choose one"
              onBlur={this.handleSetTouched}
              onChange={this.handleChange}
              fluid
              selection
              options={[
                { key: "mentor", text: "Mentor", value: "mentor" },
                { key: "trainee", text: "Trainee", value: "trainee" },
              ]}
            />
          </Form.Field>
          <Form.Field required>
            <h3>Tech Languages</h3>
            <span className="error-message">
              {this.state.tech_languages.length
                ? ""
                : " This field is required"}
            </span>
            <Dropdown
              placeholder="Tech Languages"
              fluid
              multiple
              selection
              name="tech_languages"
              onChange={this.handleChange}
              onBlur={this.handleTouch}
              options={[
                { key: "angular", text: "Angular", value: "Angular" },
                { key: "css", text: "CSS", value: "CSS" },
                {
                  key: "design",
                  text: "Graphic Design",
                  value: "Graphic Design",
                },
                { key: "java", text: "Java", value: "Java" },
                { key: "html", text: "HTML", value: "HTML" },
                { key: "ia", text: "Information Architecture", value: "IA" },
                { key: "javascript", text: "Javascript", value: "Javascript" },
                { key: "mech", text: "Mechanical Engineering", value: "Mech" },
                { key: "node", text: "NodeJS", value: "NodeJS" },
                { key: "python", text: "Python", value: "python" },
                { key: "rails", text: "Rails", value: "Python" },
                { key: "react", text: "React", value: "React" },
                { key: "ruby", text: "Ruby", value: "Ruby" },
                { key: "ui", text: "UI Design", value: "UI" },
                { key: "ux", text: "User Experience", value: "UX" },
              ]}
            />
            <div className="ui button">Clear</div>
          </Form.Field>

          {/* come back for google api */}
          <Form.Field required>
            <h3>City in California</h3>
            <span className="error-message">
              {this.state.home_city ? "" : " This field is required"}
            </span>
            <Dropdown
              name="home_city"
              placeholder="Choose one"
              onChange={this.handleChange}
              fluid
              search
              selection
              options={CityList}
            />
          </Form.Field>
          <Form.Field required>
            <h3>Years of Experience</h3>
            <span className="error-message">
              {this.state.experience ? "" : " This field is required"}
            </span>
            <Dropdown
              name="experience"
              placeholder="Choose one"
              onChange={this.handleChange}
              fluid
              selection
              options={[
                { key: "1-2", text: "1-2 years", value: "1-2" },
                { key: "2-4", text: "2-4 years", value: "2-4" },
                { key: "5", text: "5+ years", value: "5" },
              ]}
            />
          </Form.Field>
          <Form.Field style={{ textAlign: "center" }}>
            <h3 className="title">Upload a profile picture</h3>
            <div className="uploader">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleFileChange}
              >
                {" "}
                {img_url ? (
                  <img src={img_url} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </Form.Field>

          <CustomButton
            style={{ margin: "30px auto" }}
            type="submit"
            disabled={
              !this.state.profile_type ||
              !this.state.tech_languages.length ||
              !this.state.experience ||
              !this.state.home_city
            }
          >
            Submit
          </CustomButton>
        </Form>
      </div>
    );
  }
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignUpForm);
