import request from '@/utils/request'
// 获取七牛token
export function getQiniuToken() {
    return request({
        url: '/upload',
        method: 'post'
    })
}
