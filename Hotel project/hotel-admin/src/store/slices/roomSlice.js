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
         
      },
      updateRoomInfo ( state, action){
         state.roomList.forEach( (item, index) => {
            if( item.id === action.payload.id){
               state.roomList.splice(index, 1, action.payload)
            }
         })
      },
      deleteRoom (state, action) {
         state.roomList.forEach( (item, index) => {
            if( item.id === action.payload){
               state.roomList.splice(index, 1)
            }
         })
      }
   }
})

export const {
   fetchRoomDataAction,
   fetchRoomDataSuccess,
   fetchRoomDataFail,
   updateRoomInfo,
   deleteRoom
} = roomSlice.actions;

export const roomReducer = roomSlice.reducer;

