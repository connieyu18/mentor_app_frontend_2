import {createSelector} from 'reselect'; 

const selectUser =state=>state.user; 

export const selectCurrentUser= createSelector(
    [selectUser], //input array
    (user)=>user.currentUser
);