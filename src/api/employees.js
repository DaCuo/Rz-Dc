import request from '@/utils/request'

/**
 *  获取员工的简单列表
 * **/
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工的综合列表数据
 * ***/
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  console.log(data)
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** *
 *  封装一个导入员工的接口
 *
 * ***/

export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

/**
 *  修改基本信息
 * @param {*} id
 * @returns
 */
export function getEmployee(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
/**
 * 更新员工个人信息
 * @param {*} data
 * @returns
 */
export function getEmployeeInfo(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'PUT',
    data
  })
}
/**
 *  获取员工岗位信息
 * @param {*} id
 * @returns
 */
export function getEmployeeJob(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}
/**
 * 更新员工岗位接口
 * @param {Object} data {}
 * @returns ---Promise
 */
export const saveEmployeeJob = (data) => {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'PUT',
    data
  })
}
