import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/users/list',
    method: 'post',
    data
  })
}
export function getUserCount(data) {
  return request({
    url: '/users/count',
    method: 'post',
    data
  })
}
export function updateUserinfo(data) {
  return request({
    url: '/users/update',
    method: 'post',
    data
  })
}


// 通过手机号模糊查询会员
export function queryUserByMobile(data) {
  return request({
    url: '/users/query-user-by-mobile',
    method: 'post',
    data
  })
}
// 创建会员
export function createUserinfo(data) {
  return request({
    url: '/users/add',
    method: 'post',
    data
  })
}
