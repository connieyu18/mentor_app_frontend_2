import React from "react";
import "../../components/portfolio/portfolio.component";
import "./other-portfolio-page.styles.scss";
// import './portfolio-page.styles.scss';
// import "./portfolio.styles.scss";
// import "../../components/portfolio-card/portfolio-card.component";
import { Badge } from "antd";
import { Icon } from "semantic-ui-react";

import PortfolioCardComments from "../../components/portfolio/portfolio-card/portfolio-card-comments/portfolio-card-comments.component";
import axios from "../../utils";

import { Form } from "semantic-ui-react";
import { Button } from "antd";

class OtherUserPortfolio extends React.Component {
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

  componentDidMount() {
    let other_user_name = this.props.match.params;
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/project/getProjectsOtherUser", {
        params: {
          token,
          other_user_name,
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
    let other_user_name = this.props.match.params;
    let rating = e.rating;
    let project_id = e._id;
    console.log("Rating", rating);
    let token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/project/rating_other_user", {
        rating,
        other_user_name,
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
    let other_user_name = this.props.match.params;
    console.log("other-user-", other_user_name);
    const project_id = e._id;
    const { comments } = this.state;
    console.log("comment", comments);
    event.preventDefault();
    let token = localStorage.getItem("token");
    // this.setState({
    //   comment: comment,
    // });
    axios
      .post("http://localhost:5000/project/new_comment_other_user", {
        comments,
        token,
        project_id,
        index,
        other_user_name,
      })
      .then((res) => {
        this.setState({
          projects: res.data.projects,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let name = this.props.match.params.display_name;
    return (
      <div className="main-wrapper-portfolio">
        <h1>
          {name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()}'s
          Portfolio
        </h1>
        <div className="comment-box">
          <h4>
            {" "}
            <Icon disabled size="large" color="blue" name="thumbs up outline" />
            Leave a comment and rating for{" "}
            {name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()}{" "}
          </h4>
        </div>
        <div className="portfolio2">
          {this.state.projects.length > 0 ? (
            this.state.projects.map((e, index) => (
              <div key={index}>
                <div
                  style={{ marginRight: "60px" }}
                  className="portfolio-card "
                >
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
                          src={require("../../assets/img/LelleIndex.png")}
                        />
                      )}
                    </div>
                  </div>
                  <div className="review-container">
                    <div className="rating-container">
                      <Badge
                        style={{
                          backgroundColor: "lightblue",
                          color: "black",
                        }}
                        count={e.rating}
                      >
                        <img
                          name={e._id}
                          onClick={this.handleRating.bind(null, e, index)}
                          className="thumbs-icon"
                          src={require("../../assets/img/thumbs-icon.png")}
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
                                  // name={e.id}
                                  // value={this.state.elem_id}
                                  className="button-comments"
                                  size="small"
                                  type="primary"
                                  // value={this.state.comment[index]}
                                  onClick={this.submitComment(e, index)}
                                >
                                  Enter
                                </Button>
                              </Form>
                              <div className="all-comments-container">
                                <p>
                                  Comments ({" "}
                                  {e.comments ? e.comments.length : 0} )
                                </p>
                                <div id="comments-list">
                                  {e.comments
                                    ? e.comments.map((elem, idx) => (
                                        <p key={idx}>
                                          <span className="mentor-name">
                                            {elem.comment_by.charAt(0).toUpperCase()+elem.comment_by.substring(1).toLowerCase()} commented:{" "}
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
          ) : (
            <div>
              <h5>No projects to view yet</h5>
              <img
                className="teacher-img"
                src={require("../../assets/img/teachers.png")}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default OtherUserPortfolio;
