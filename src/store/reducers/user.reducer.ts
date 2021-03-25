import { LOGIN, LoginUnionType } from '../actions/user.action'

export interface UserInfo {
  bio?: string
  createdAt: string
  email: string
  id: number
  image?: string
  token: string
  updatedAt: string
  username: string
}

export interface loginState {
  userInfo: UserInfo
}

const initialState: loginState = {
  userInfo : {
    bio: '',
    createdAt: '',
    email: '',
    id: 0,
    image: '',
    token: '',
    updatedAt: '',
    username: '',
  }
}
// interface InitialState {
//   count: number
// }

// function handleLogin(state: InitialState, action: LoginInterface) {
//   return state
// }

// export default createReducer(
//   {
//     'login': handleLogin
//   }, initialState
// )
export default function loginReducer(state = initialState, action: LoginUnionType) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userInfo: {
          ...action.payload
        }
      }
    default:
      return state
  }
}