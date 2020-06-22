import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import meetingReducer from "./meeting/meeting.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["meeting", "user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  meeting: meetingReducer,
});

export default persistReducer(persistConfig, rootReducer);
