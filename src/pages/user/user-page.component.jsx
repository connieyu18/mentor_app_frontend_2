import React from 'react';
import {Switch,Route} from "react-router-dom";

import './user-page.styles.scss';

import Header from '../../components/header/header.component';
import SignUpForm from '../sign-up-form/sign-up-form.component';
import SearchPage from '../search-page/search-page.component';
import ProfilePage from '../profile/profile-page.component';
import AddAvailabilityPage from '../add-availability-page/add-availability-page.component';
import MeetingsRequestsPage from '../meetings-requests-page/meetings-requests-page.component';
import PortfolioPage from '../portfolio-page/portfolio-page.component';
import OtherUserProfile from '../other-user-profile-page/other-user-profile-page.component';
import OtherUserPortfolio from '../other-portfolio-page/other-portfolio-page.component'
const UserPage =()=>(
  <div>
    <Header/>
    <Switch>
      <Route exact path="/user/profile" component={ProfilePage}/>
      <Route exact path="/user/:_id/profile2" component={OtherUserProfile}/>
      <Route exact path="/user/search" component={SearchPage}/>
      <Route exact path="/user/add-availability" component={AddAvailabilityPage}/>
      <Route exact path="/user/meetings-requests" component={MeetingsRequestsPage}/>
      <Route exact path="/user/portfolio" component={PortfolioPage}/>
      <Route exact path="/user/:display_name/portfolio" component={OtherUserPortfolio}/>
    </Switch>
  </div>
)


export default UserPage;