import { all } from 'redux-saga/effects'
import loginSaga from './user.saga'


export default function* rootSaga() {
  yield all([loginSaga()])
}