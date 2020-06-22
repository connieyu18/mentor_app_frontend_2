// import React, { useState, useEffect } from "react";

// import "./request-card.styles.scss";

// import { Button } from "antd";

// const RequestCard = (props) => (
//   // useEffect(() => {
//   //   // console.log("this is", key);

//   //   console.log("this is props1`111", props.availabilities);
//   // });
//   // // return(<div></div>)
//   // return (
//   <div>
//     {props.availabilities.map((e, index) => {
//       return (
//         <div key={index} className="request-card">
//           <div className="request-img-container">
//             {/* {this.state.availabilities.map((e, index) => ( */}
//             <div className="top-container">
//               <img
//                 className="profile-img"
//                 src={require("../../assets/img/my-profile-img.jpg")}
//               />

//               <h5>{e.display_name}</h5>
//             </div>
//             <div className="bottom-container">
//               <p>
//                 <u>Meeting Details</u>
//               </p>
//               <p>
//                 {props.availabilities.meetings_requests.map((item, index) => (
//                   <h2>Date: {item ? item.requested_date : null} </h2>
//                   // {props.availabilities ? props.availabilities.start_date : null}
//                 ))}
//               </p>
//               <p>Time:</p>
//               <p>Meeting Method:</p>
//             </div>
//           </div>
//           <div className="request-info-container">
//             <h5>
//               <u>Details</u>
//             </h5>
//             <p>Location: Daly City</p>
//             <p>Tech Languages:Javascript</p>
//             <p>Years of Experience:5</p>
//             <p>Languages Spoken: English</p>
//             {/* ))} */}
//             <Button size="small" type="primary">
//               Confirm
//             </Button>
//             <Button size="small" type="primary">
//               Delete
//             </Button>
//           </div>
//         </div>
//       );
//     })}
//   </div>
// );

// export default RequestCard;
