import request from '@/utils/request'

export function sendSms(data) {
  return request({
    url: '/user/send/sms',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/info/get/info',
    method: 'post'
  })
}

export function modUserName(data) {
  return request({
    url: '/info/update/username',
    method: 'post',
    data
  })
}
