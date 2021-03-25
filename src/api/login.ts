import request from '../utils/request'

export interface LoginData {
  user: {
    email: string
    password: string
  }
}
export interface RegistData {
  user: {
    username: string,
    email: string,
    password: string
  }
}


export const login = (data: LoginData) => {
  return request({
    method: 'POST',
    url: '/users/login',
    data
  })
}

export const regist = (data: RegistData) => {
  return request({
    method: 'POST',
    url: '/users',
    data
  })
}

