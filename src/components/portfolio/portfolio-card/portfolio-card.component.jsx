import React from "react";

import "./portfolio-card.styles.scss";
import { Badge } from "antd";
import PortfolioCardComments from "./portfolio-card-comments/portfolio-card-comments.component";
import axios from "../../../utils";

import { Form } from "semantic-ui-react";
import { Button } from "antd";

class PortfolioCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      link: "",
      image: "",
      projects: [],
      clicked: false,
      rating: 0,
      comments: [
        {
          comment: "",
        },
      ],
      comment: "",
      clickedIndex: 0,
      newComment: {},
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.newProject != this.props.newProject) {
      let newProject = {
        project_name: nextProps.newProject.project_name,
        project_description: nextProps.newProject.project_description,
        project_link: nextProps.newProject.project_link,
        project_img_url: nextProps.newProject.project_img_url,
      };
      let newProjects = [newProject, ...this.state.projects];
      this.setState({ projects: newProjects });
    }
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/project/getProjects", {
        params: {
          token,
        },
      })
      .then((response) => {
        this.setState(
          {
            projects: response.data.projects,
          },
          () => console.log(this.state.projects)
        );
      })
      .catch((err) => console.log(err));
  }

  handleRating = (e, index) => {
    let rating = e.rating;
    let project_id = e._id;
    let token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/project/rating", {
        rating,
        token,
        project_id,
      })
      .then((res) => {
        this.setState({
          projects: res.data.projects,
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (newComment, index, event) => {
    this.setState({ comments: newComment });
  };

  submitComment = (e, index, idx) => (event) => {
    const project_id = e._id;
    const { comments } = this.state;

    event.preventDefault();
    let token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/project/new_comment", {
        comments,
        token,
        project_id,
        index,
      })
      .then((res) => {
        this.setState({
          projects: res.data.projects,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.projects.length <= 0 ? (
          <div className="portfolio-card">
            <h2>Add a new project</h2>
            <div className="portfolio-card-header">
              <div className="image-portfolio-container">
                <img
                  alt="portfolio-img"
                  className="image-portfolio"
                  src={require("../../../assets/img/LelleIndex.png")}
                />
              </div>
            </div>
            <div className="review-container">
              <div className="rating-container">
                <img
                  className="thumbs-icon"
                  src={require("../../../assets/img/thumbs-icon.png")}
                />
                <p>Click here if you like this project</p>
              </div>
              <div className="comments-wrapper">
                <div className="portfolio-card-comments">
                  <br></br>
                  <div className="form-container">
                    <Form>
                      <input
                        type="text"
                        name="comment"
                        value={this.state.comment}
                        onChange={this.handleChange}
                        placeholder="Leave a comment"
                        required
                      />
                      <Button
                        type="submit"
                        className="button-comments"
                        size="small"
                        type="primary"
                        onClick={this.submitComment.bind()}
                      >
                        Enter
                      </Button>
                    </Form>
                  </div>
                  <div className="all-comments-container">
                    <p>Comments( 0 )</p>
                    <div className="comments-list">
                      <p>
                        <span className="mentor-name"></span>
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        ) : (
          // newprojects
          this.state.projects.map((e, index) => (
            <div key={index}>
              <div style={{ marginRight: "60px" }} className="portfolio-card ">
                <div className="portfolio-card-header">
                  <h2>
                    {e.project_name
                      ? e.project_name.charAt(0).toUpperCase() +
                        e.project_name.substring(1).toLowerCase()
                      : "N/A"}
                  </h2>
                  <h5>
                    Description:{"  "}
                    {e.project_description ? e.project_description : "N/A"}
                  </h5>
                  <h5>
                    Link:{"  "}
                    <a href={e.project_link}>
                      {" "}
                      <u>{e.project_link ? e.project_link : "N/A"}</u>
                    </a>
                  </h5>
                  <div className="image-portfolio-container">
                    {e.project_img ? (
                      <img
                        className="image-portfolio"
                        src={e.project_img}
                        alt="profileImg"
                      />
                    ) : (
                      <img
                        alt="portfolio-img"
                        className="image-portfolio"
                        src={require("../../../assets/img/LelleIndex.png")}
                      />
                    )}
                  </div>
                </div>
                <div className="review-container">
                  <div className="rating-container">
                    <Badge
                      style={{ backgroundColor: "lightblue", color: "black" }}
                      count={e.rating}
                    >
                      <img
                        name={e._id}
                        onClick={this.handleRating.bind(null, e, index)}
                        className="thumbs-icon"
                        src={require("../../../assets/img/thumbs-icon.png")}
                      />
                    </Badge>
                    <p>Click here if you like this project</p>
                  </div>
                  <div className="comments-wrapper">
                    <div className="comments-wrapper">
                      <div className="portfolio-card-comments">
                        <br></br>
                        <div className="form-container">
                          <div>
                            <Form>
                              <input
                                type="text"
                                key={index}
                                // name="comment"
                                value={this.state.comment[index]}
                                // value={this.state.comment[index]}
                                // value={this.state.elem_id}
                                // value={elem[idx].comment}
                                // value={this.state.comments[index].comment}
                                onChange={(e) =>
                                  this.handleChange(e.target.value, index)
                                }
                                placeholder="Leave a comment"
                                required
                              />
                              <Button
                                type="submit"
                                className="button-comments"
                                size="small"
                                type="primary"
                                onClick={this.submitComment(e, index)}
                              >
                                Enter
                              </Button>
                            </Form>
                            <div className="all-comments-container">
                              <p>
                                Comments ( {e.comments ? e.comments.length : 0}{" "}
                                )
                              </p>
                              <div id="comments-list">
                                {e.comments
                                  ? e.comments.map((elem, idx) => (
                                      <p key={idx}>
                                        <span className="mentor-name">
                                          {elem.comment_by
                                            .charAt(0)
                                            .toUpperCase() +
                                            elem.comment_by
                                              .substring(1)
                                              .toLowerCase()}{" "}
                                          commented:{" "}
                                        </span>
                                        {elem.comment}
                                      </p>
                                    ))
                                  : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {this.state.projects.length % 2 == 0 ? null : (
          <div
            style={{ border: "none", boxShadow: "none" }}
            className="portfolio-card"
          ></div>
        )}
      </div>
    );
  }
}

export default PortfolioCard;
