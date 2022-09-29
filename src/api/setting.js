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

/**
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

/** **
 *  删除角色
 *
 * ****/
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

export const getCompanyInfoAPI = (companyId) => {
  return request({ url: `/company/${companyId}` })
}