import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/account/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/account/userinfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function changePassword(data) {
  return request({
    url: '/account/change-password',
    method: 'post',
    data
  })
}
