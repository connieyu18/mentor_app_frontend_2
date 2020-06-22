import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyA97Ae9k2JCk3EDqOXCIYKD-rTKTe0dWlA",
  authDomain: "mentor-app-2315e.firebaseapp.com",
  databaseURL: "https://mentor-app-2315e.firebaseio.com",
  projectId: "mentor-app-2315e",
  storageBucket: "mentor-app-2315e.appspot.com",
  messagingSenderId: "990347518399",
  appId: "1:990347518399:web:c18c8980a6683294f7c10a",
  measurementId: "G-D6Y8B01TYR"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
  storage, firebase as default
}
