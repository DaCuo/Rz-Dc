//  引入封装后的axios
import request from '@/utils/request'

/**
 *
 * @param {Object} data 需要传入 mobile  和password
 * @returns
 */
export function loginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

