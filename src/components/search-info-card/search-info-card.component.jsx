import React from "react";

import SearchAvailabilityTable from "../search-info-card/search-availability-table/search-availability-table.component";

const SearchInfoCard = () => (
  <div className="search-info-card">
    <h2>Name</h2>
    <img
      className="profile-img"
      src={require("../../assets/img/my-profile-img.jpg")}
    />
    <h5>Availabilities</h5>
    <SearchAvailabilityTable />
    <h5>Request for meeting</h5>
  </div>
);
export default SearchInfoCard;
