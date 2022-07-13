import { all, fork } from 'redux-saga/effects'
import { roomSaga } from './roomSaga'

export default function* rootSaga () {
   yield all([fork(roomSaga), ])
}