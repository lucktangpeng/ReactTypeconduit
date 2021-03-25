import { put, takeEvery} from 'redux-saga/effects'
import { loginAction, LoginActionAsync, LOGINASYNC } from '../actions/user.action'
import { login } from '../../api/login'
import { createHashHistory } from 'history'
const history = createHashHistory()
function* handleLogin(action: LoginActionAsync) {
  yield console.log('我写的saga执行了')
  const { data } = yield login(action.payload)
  yield put(loginAction(data.user))
  yield window.localStorage.setItem('userInfo', JSON.stringify(data.user))
  yield history.push('/')
}


export default function* loginSaga() {
  yield takeEvery(LOGINASYNC, handleLogin)
}