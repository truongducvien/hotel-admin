import { call, put, takeEvery } from 'redux-saga/effects'
import { 
   fetchRoomDataAction,
   fetchRoomDataSuccess
} from '../slices/roomSlice'

import { API_URL } from '../../api/constAPI'

const RoomDataURL = `${API_URL}/roomList`


function getRoomListFromAPI () {
   return fetch(RoomDataURL).then( res => res.json())
}

function* fetchRoomData () {
   try{
      const data = yield call(getRoomListFromAPI)
      yield put(fetchRoomDataSuccess(data))
   }catch (e) {
      console.log("Error: ", e)
   }
}

export function* roomSaga () {
   yield takeEvery(fetchRoomDataAction, fetchRoomData)
}