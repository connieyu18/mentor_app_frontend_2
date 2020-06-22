import { meetingActionTypes } from "./meeting.types";

const INITIAL_STATE = {
  meetings_confirmed: {}
};

const meetingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case meetingActionTypes.ADD_CONFIRMED_MEETING:
      return {
        ...state,
        meetings_confirmed: action.payload
      };
    default:
      return state;
  }
};

export default meetingReducer;
