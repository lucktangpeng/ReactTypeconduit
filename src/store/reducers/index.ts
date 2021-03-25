import {combineReducers} from 'redux'
import loginReducer, { loginState } from './user.reducer'
import { History } from 'history'
import { connectRouter, RouterState } from "connected-react-router";


export interface AppState {
  router: RouterState
  login: loginState
}
const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  login: loginReducer
})

export default createRootReducer