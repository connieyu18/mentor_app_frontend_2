import React from "react";
import axios from "../../../utils";

import CityList from "../../../city-list";
import CustomButton from "../../../components/custom-button/custom-button.component";
import Card from "../card/card.component";

import { Button, Dropdown, Form } from "semantic-ui-react";

import "./search-form.styles.scss";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      profile_type: "",
      display_name: "",
      picture: "",
      tech_languages: [],
      home_city: "",
      experience: "",
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

  componentDidMount() {
    let token = localStorage.getItem("token");
    axios({
      method: "get",
      url: "http://localhost:5000/search/getAllResults",
      headers: { Authorization: token },
    }).then((response) =>
      this.setState({ collection: response.data.collection }, () =>
        console.log(this.state.collection)
      )
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    const { tech_languages, home_city, experience } = this.state;
    const data = {
      tech_languages,
      home_city,
      experience,
    };
    axios({
      method: "get",
      url: "http://localhost:5000/search/getSearchResults",
      headers: { Authorization: token },
      params: data,
    }).then((response) =>
      this.setState({ collection: response.data.collection })
    );
  };

  render() {
    const { profile_type, tech_languages, home_city, experience } = this.state;
    return (
      <div className="search-form">
        <img
          className="leaves-left-1"
          src={require("../../../assets/img/leafs-left.png")}
        />
        <img
          className="leaves-right-1"
          src={require("../../../assets/img/leaves.png")}
        />

        <h1>Search for a mentor or trainee</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <h3>Tech Languages</h3>
            <Dropdown
              placeholder="Tech Languages"
              fluid
              multiple
              selection
              search
              name="tech_languages"
              onChange={this.handleChange}
              options={[
                { key: "angular", text: "Angular", value: "Angular" },
                { key: "css", text: "CSS", value: "CSS" },
                {
                  key: "design",
                  text: "Graphic Design",
                  value: "Graphic Design",
                },
                { key: "ember", text: "Ember", value: "Ember" },
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
          </Form.Field>
          <Form.Field>
            <h3>City in California</h3>
            <Dropdown
              name="home_city"
              placeholder="Choose one"
              onChange={this.handleChange}
              fluid
              search
              required
              selection
              options={CityList}
            />
          </Form.Field>
          <h3>Years of Experience</h3>
          <Dropdown
            name="experience"
            placeholder="Choose one"
            onChange={this.handleChange}
            fluid
            required
            selection
            options={[
              { key: "1-2", text: "1-2 years", value: "1-2" },
              { key: "2-4", text: "2-4 years", value: "2-4" },
              { key: "5", text: "5+ years", value: "5" },
            ]}
          />
          <CustomButton style={{ margin: "30px auto" }} type="submit">
            Submit
          </CustomButton>
        </Form>
        <h4>Scroll down to see your search results</h4>
        <div className="bottom-container">
          <h1>Search Results</h1>
          <p>Click on any results to view details</p>
          <div className="collections-overview">
            {this.state.collection.map((e, index) => (
              <Card
                key={index}
                _id={e._id}
                picture={e.picture}
                display_name={e.display_name}
                home_city={e.home_city}
                tech_languages={e.tech_languages}
                experience={e.experience}
                profile_type={e.profile_type}
                imgUrl={e.profile_image_url}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;
