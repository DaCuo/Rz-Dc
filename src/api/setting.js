import request from '@/utils/request'
export const getUserList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

