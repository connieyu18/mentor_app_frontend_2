import React from "react";

import { Form } from "semantic-ui-react";
import { Button } from "antd";

import "./portfolio-card-comments.styles.scss";

const PortfolioCardComments = (props) => (
  <div className="portfolio-card-comments">
    <br></br>
    <div className="form-container">
      <Form>
        <input
          type="text"
          name="comment"
          placeholder="Leave a comment"
          required
        />
        <Button className="button-comments" size="small" type="primary">
          Enter
        </Button>
      </Form>
    </div>
    <div className="all-comments-container">
      <p>Comments from Mentors ( 1 )</p>
      <div className="comments-list">
        <p>
          <span className="mentor-name">Mentor Name commented: </span>Your
          project is great!
        </p>
      </div>
    </div>
  </div>
);
export default PortfolioCardComments;
