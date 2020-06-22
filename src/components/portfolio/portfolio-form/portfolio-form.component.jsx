// import React from "react";
// import { Upload, Button, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import "./portfolio-form.styles.scss";
// import { Form } from "semantic-ui-react";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

// import UploadFile from "../../upload-file/upload-file.component";
// import CustomButton from "../../../components/custom-button/custom-button.component";
// import axios from "../../../utils";
// import { storage } from "../../../firebase/index.js";

// class PortfolioForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       project_name: "",
//       project_description: "",
//       project_link: "",
//       loading: false,
//       project_img: "",
//     };
//   }

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleFileChange = (info) => {
//     if (info.file.status === "uploading") {
//       this.setState({ loading: true });
//       return;
//     }
//     if (info.file.status === "done") {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, (imageUrl) => {
//         console.log('url!!!'+imageUrl)
//         let token = localStorage.getItem("token");
//         axios
//           .get("http://localhost:5000/profile/getUserProfile", {
//             params: {
//               token,
//             },
//           })
//           .then((response) => {
//             let uploadTask = storage
//               .ref(`portfolio-images/${response.data.user._id}`)
//               // .put(imageUrl);
//               .putString(imageUrl, 'data_url', {contentType:"image/jpg"});
//             uploadTask.on(
//               "state_changed",
//               (snapshot) => {},
//               (error) => {
//                 console.log(error);
//               },
//               () => {
//                 storage
//                   .ref("portfolio-images")
//                   .child(response.data.user._id)
//                   .getDownloadURL()
//                   .then((url) => {
//                     console.log("DDDD" + url);
//                     this.setState({
//                       project_img: url,
//                     });
//                   });
//               }
//             );
//           });
//       });
//     }
//   };

//   // handleFileChange = (e) => {
//   //   if (e.target.files[0]) {
//   //     let file = e.target.files[0];
//       // let token = localStorage.getItem("token");
//       // axios
//       //   .get("http://localhost:5000/profile/getUserProfile", {
//       //     params: {
//       //       token,
//       //     },
//       //   })
//       //   .then((response) => {
//       //     let uploadTask = storage
//       //       .ref(`portfolio-images/${response.data.user._id}`)
//       //       .put(file);
//       //     uploadTask.on(
//       //       "state_changed",
//       //       (snapshot) => {},
//       //       (error) => {
//       //         console.log(error);
//       //       },
//       //       () => {
//       //         storage
//       //           .ref("portfolio-images")
//       //           .child(response.data.user._id)
//       //           .getDownloadURL()
//       //           .then((url) => {
//       //             console.log("DDDD" + url);
//       //             this.setState({
//       //               project_img: url,
//       //             });
//       //           });
//       //       }
//       //     );
//       //   });
//   //   }
//   // };

//   Submit = (e) => {
//     console.log("img!!", this.state.project_img);
//     let token = localStorage.getItem("token");
//     e.preventDefault();
//     const {
//       project_name,
//       project_description,
//       project_link,
//       project_img,
//     } = this.state;
//     axios
//       .post("http://localhost:5000/project/create_project", {
//         token,
//         project_name,
//         project_description,
//         project_link,
//         project_img,
//       })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((err) => console.log(err));
//   };
//   render() {
//     const {
//       project_name,
//       project_description,
//       project_link,
//       project_img,
//     } = this.state;
//     const uploadButton = (
//       <div>
//         {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );

//     return (
//       <div className="portfolio-form">
//         <Form>
//           <h2>
//             <u>Add new project</u>
//           </h2>
//           <Form.Field>
//             <h5>Project Name</h5>
//             <input
//               type="text"
//               name="project_name"
//               value={project_name}
//               onChange={this.handleChange}
//               placeholder="Project Name"
//               required
//             />
//           </Form.Field>
//           <Form.Field>
//             <h5>Description</h5>
//             <input
//               type="text"
//               name="project_description"
//               value={project_description}
//               onChange={this.handleChange}
//               placeholder="Description"
//               required
//             />
//           </Form.Field>
//           <Form.Field>
//             <h5>Link</h5>
//             <input
//               type="text"
//               name="project_link"
//               value={project_link}
//               onChange={this.handleChange}
//               placeholder="Link"
//               required
//             />
//           </Form.Field>
//           <Form.Field>
//             <h5>Upload an Image of your Project</h5>
//             <div className="uploader">
//               {/* <input type="file" onChange={this.handleFileChange} /> */}
//               <Upload
//                 name="avatar"
//                 listType="picture-card"
//                 className="avatar-uploader"
//                 showUploadList={false}
//                 action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                 beforeUpload={beforeUpload}
//                 onChange={this.handleFileChange}
//               >
//                 {" "}
//                 {project_img ? (
//                   <img
//                     src={project_img}
//                     alt="avatar"
//                     style={{ width: "100%" }}
//                   />
//                 ) : (
//                   uploadButton
//                 )}
//               </Upload>
//               {/* <UploadFile onSelectFile={this.handleSelectedFile.bind(this)} /> */}
//             </div>
//             <CustomButton
//               onClick={this.Submit}
//               style={{ margin: "30px auto" }}
//               type="submit"
//             >
//               Submit
//             </CustomButton>
//           </Form.Field>
//         </Form>
//       </div>
//     );
//   }
// }

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// }

// export default PortfolioForm;
