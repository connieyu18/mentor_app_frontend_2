import React from 'react';
import {Route} from "react-router-dom";

import './profile-page.styles.scss'
import Profile from '../../components/profile/profile.component';
import Friends from '../../components/friends/friends.component';

const ProfilePage =()=>(
  <div className="profile-page">
    <div className="profile-info-container">
      <img className="side-flowers" src={require("../../assets/img/sideflowers.png")}/>
      <Route exact path="/user/profile" component={Profile}/>
    </div>
    <div className="friends-container">
      <Friends/>
      <img style={{bottom:"100px"}}className="leaves-right-1"src={require("../../assets/img/leaves.png")}/>
    </div>
  </div>
)

export default ProfilePage;
