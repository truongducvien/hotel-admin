import { call, delay, put, takeEvery } from 'redux-saga/effects'
import { 
   fetchRoomDataAction,
   fetchRoomDataSuccess
} from '../slices/roomSlice'

import { API_URL } from '../../api/constAPI'

const RoomDataURL = `${API_URL}/rooms`


function getRoomsFromAPI () {
   return fetch(RoomDataURL).then( res => res.json())
}

function* fetchRoomData () {
   try{
      const data = yield call(getRoomsFromAPI)
      yield delay(1000)
      yield put(fetchRoomDataSuccess(data))
   }catch (e) {
      console.log("Error: ", e)
   }
}

export function* roomSaga () {
   yield takeEvery(fetchRoomDataAction, fetchRoomData)
} 