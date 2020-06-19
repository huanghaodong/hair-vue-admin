import request from '@/utils/request'
//单个会员消费记录
export function getMoneyList(data) {
  return request({
    url: '/money/list',
    method: 'post',
    data
  })
}
//单个会员消费记录总数
export function getMoneyCount(data) {
  return request({
    url: '/money/list-count',
    method: 'post',
    data
  })
}
//店铺收益列表
export function getRevenueList(data) {
  return request({
    url: '/money/revenue-list',
    method: 'post',
    data
  })
}
//店铺收益列表数量
export function getRevenueCount(data) {
  return request({
    url: '/money/revenue-count',
    method: 'post',
    data
  })
}
export function memberRecharge(data) {
  return request({
    url: '/money/recharge',
    method: 'post',
    data
  })
}
export function temporaryPay(data) {
  return request({
    url: '/money/temporary-pay',
    method: 'post',
    data
  })
}
export function memberPay(data) {
  return request({
    url: '/money/member-pay',
    method: 'post',
    data
  })
}
