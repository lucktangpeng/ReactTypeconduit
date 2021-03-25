import { LoginData } from "../../api/login"
import {  UserInfo } from "../reducers/user.reducer"

export const LOGIN = 'LOGIN'
export const LOGINASYNC = 'LOGINASYNC'


export interface LoginActionAsync {
  type: typeof LOGINASYNC,
  payload: LoginData
}

export interface LoginAction {
  type: typeof LOGIN,
  payload: UserInfo
}

export const loginAction = (payload: UserInfo): LoginAction => ({
  type: LOGIN,
  payload
})

export const loginActionAsync = (payload: LoginData): LoginActionAsync => ({
  type: LOGINASYNC,
  payload
})


export type LoginUnionType = 
  | LoginActionAsync
  | LoginAction




// export {}