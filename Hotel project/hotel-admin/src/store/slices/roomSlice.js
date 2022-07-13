import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   roomList: [],
   isLoading: false
}

const roomSlice = createSlice({
   name: 'roomList',
   initialState,
   reducers: {
      fetchRoomDataAction(state, action){
         state.isLoading = true;
      },
      fetchRoomDataSuccess(state, action){
         state.roomList = action.payload;
         state.isLoading = false;
      },
      fetchRoomDataFail(state, action){
         
      }
   }
})

export const {
   fetchRoomDataAction,
   fetchRoomDataSuccess,
   fetchRoomDataFail
} = roomSlice.actions;

export const roomReducer = roomSlice.reducer;

