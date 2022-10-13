import request from '@/utils/request'
// import store from '@/store'
export function getUserInfo() {
  // console.log(store.getters.token)
  return request({
    url: '/sys/profile',
    method: 'POST'
    // headers: { Authorization: `Bearer ${store.getters.token}` }
  })
}

export const getUserDetailById = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}

export const saveUserDetailById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

