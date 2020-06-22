import {projectActionTypes} from './project.types'; 

export const addConfirmedProject = (meeting)=>({
    type:meetingActionTypes.ADD_CONFIRMED_MEETING,
    payload:meeting
});


