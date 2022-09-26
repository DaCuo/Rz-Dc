//  引入封装后的axios
import require from '@/utils/request'

/**
 *
 * @param {Object} data 需要传入 mobile  和password
 * @returns
 */
export function loginAPI(data) {
  return require({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

