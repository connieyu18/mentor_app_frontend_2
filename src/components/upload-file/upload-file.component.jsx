// import React, {useState } from "react";

// import "antd/dist/antd.css";
// import { Upload, Button } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "../../utils";

// // import "./upload-file.styles.scss";
// // import {storage} from "../../firebase/index.js";

// // const props = {
// //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
// //   onChange({ file, fileList }) {
// //     if (file.status !== "uploading") {
// //       console.log(file, fileList);
// //     }
// //   },
// //   defaultFileList: [
// //     {
// //       uid: "1",
// //       name: "xxx.png",
// //       status: "done",
// //       response: "Server Error 500", // custom error message to show
// //       url: "http://www.baidu.com/xxx.png"
// //     },
// //     // {
// //     //   uid: "2",
// //     //   name: "yyy.png",
// //     //   status: "done",
// //     //   url: "http://www.baidu.com/yyy.png"
// //     // },
// //     // {
// //     //   uid: "3",
// //     //   name: "zzz.png",
// //     //   status: "error",
// //     //   response: "Server Error 500", // custom error message to show
// //     //   url: "http://www.baidu.com/zzz.png"
// //     // }
// //   ]
// // };

// const UploadFile = (props) => {
//   let [imgFile, setImgFile] = useState("");

//   const handleChange = e => {

//     if (e.target.files[0]){
//       let file = e.target.files[0];
//       let token = localStorage.getItem("token");
//       axios.get("http://localhost:5000/profile/getUserProfile",{
//         params: {
//           token
//         }
//       }).then(response=>{
//         let uploadTask = storage.ref(`images/${response.data.user._id}`).put(file);
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {

//           },
//           (error) => {
//             console.log(error)
//           },
//           () => {
//             storage.ref("images").child(response.data.user._id).getDownloadURL().then(img_url => {
//               setImgFile(img_url)
//               console.log(imgFile, "this is the url");
              
//             })
//             props.onSelectFile({imgFile})

//             console.log("success!?")
//           }
//         )
//       }).catch(err=>console.log(err))
//     }
//   }

//   return (
//     <div className="upload">
//       <input type="file"  onChange={handleChange} />
//       {/* <Upload {...props} onChange={handleChange}>
//         <Button onClick={uploadImg}>
//           <UploadOutlined /> Upload
//         </Button>
//       </Upload> */}
//     </div>
//   )
// };

// export default UploadFile;
