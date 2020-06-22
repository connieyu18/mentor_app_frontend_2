import React from "react";
import axios from "../../../utils";
import { connect } from "react-redux";

import Card from "../card/card.component";

import "./collection-overview.styles.scss";

class CollectionOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      display_name: "",
      home_city: "",
      tech_languages: [],
      experience: "",
    };
  }

  render() {
    let { display_name, home_city, tech_languages, experience } = this.state;
    return (
      <div className="collections-overview">
        <Card display_name={display_name} home_city={home_city} />
      </div>
    );
  }
}

export default CollectionOverview;
