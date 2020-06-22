import React from "react";
import { Button, Dropdown, Form } from "semantic-ui-react";

import "./search-page.styles.scss";

import SearchForm from "../../components/search/search-form/search-form.component";
import SearchInfoCard from '../../components/search-info-card/search-info-card.component';
import CollectionOverview from "../../components/search/collection-overview/collection-overview.component";


const SearchPage = () => (
  <div className="search-page">
    <div className="top-container">
      <div className="search-form-container">
        <SearchForm/>
      </div>
      <div className="profile-container">
        {/* <h1>View Details</h1>
        <SearchInfoCard/> */}
      </div>
    </div>
    {/* <div className="bottom-container">
        <h1>Search Results</h1>
        <p>Click on any results to view details</p>
        <CollectionOverview/>
    </div> */}
    {/* <CollectionOverview/> */}
  </div>
);

export default SearchPage;
