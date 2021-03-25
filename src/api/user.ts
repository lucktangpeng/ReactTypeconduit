import request from '../utils/request'


export const getProfile = (params: string) => {
  return request({
    method: 'get',
    url: `/profiles/${params}`
  })
}
