import {meetingActionTypes} from './meeting.types'; 

export const addConfirmedMeeting = (meeting)=>({
    type:meetingActionTypes.ADD_CONFIRMED_MEETING,
    payload:meeting
});



