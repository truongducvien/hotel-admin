import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   rooms: [],
   isLoading: false
}

const roomSlice = createSlice({
   name: 'rooms',
   initialState,
   reducers: {
      fetchRoomDataAction(state, action){
         state.isLoading = true;
      },
      fetchRoomDataSuccess(state, action){
         state.rooms = action.payload;
         state.isLoading = false;
      },
      fetchRoomDataFail(state, action){
         
      },
      updateRoomInfo ( state, action){
         state.rooms.forEach( (item, index) => {
            if( item.id === action.payload.id){
               state.rooms.splice(index, 1, action.payload)
            }
         })
      },
      deleteRoom (state, action) {
         state.rooms.forEach( (item, index) => {
            if( item.id === action.payload){
               state.rooms.splice(index, 1)
            }
         })
      },
      addNewRoom (state, action) {
         state.rooms = [...state.rooms, action.payload]
      }
   }
})

export const {
   fetchRoomDataAction,
   fetchRoomDataSuccess,
   fetchRoomDataFail,
   updateRoomInfo,
   deleteRoom,
   addNewRoom
} = roomSlice.actions;

export const roomReducer = roomSlice.reducer;

