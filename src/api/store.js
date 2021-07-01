import request from '@/utils/request'

export function list(req) {
    // console.log(req)
    return request({
        url: '/user/store/list',
        method: 'post',
        req
    })
}

export function save(obj) {
    return request({
        url: '/store/save',
        method: 'post',
        data: obj
    })
}