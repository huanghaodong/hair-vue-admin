/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  return /^\S{2,11}$/.test(str)
}

export function isvalidMobile(str) {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(str)
}

export function isvalidMoney(str) {
  return /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test(str)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
