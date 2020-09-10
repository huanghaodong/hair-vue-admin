import request from '@/utils/request'
//店铺收益列表
export function getRevenueToday(data) {
  return request({
    url: '/statistics/revenue-today',
    method: 'post',
    data
  })
}
//店铺订单列表
export function getOrderToday(data) {
  return request({
    url: '/statistics/order-today',
    method: 'post',
    data
  })
}
