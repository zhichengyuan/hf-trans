import request from '@/utils/request'

export function listuser(data) {
    return request({
        url: '/api/user/list',
        method: 'post',
        data
    })
}
export function listemployees(data) {
    return request({
        url: '/api/user/employees',
        method: 'post',
        data
    })
}



export function login(data) {
    return request({
        url: '/api/user/login',
        method: 'post',
        data
    })
}

// 获取用户信息
export function getInfo(token) {
    return request({
        url: '/api/user/info',
        method: 'post',
        data: { token }
    })
}
// 添加收货人
export function saveCustom(data) {
    return request({
        url: '/api/user/savecustom',
        method: 'post',
        data
    })
}
// 获取收获人列表
export function getConsignee(data) {
    return request({
        url: '/api/user/listcustom',
        method: 'post',
        data
    })
}

export function logout() {
    return new Promise((resolve, reject) => {
        resolve('ok')
    })
    // return request({
    //   url: '/user/logout',
    //   method: 'post'
    // })
}








export function updataUser(data) {
    return request({
        url: '/user/changesec',
        method: 'post',
        data
    })
}
export function save(data) {
    return request({
        url: '/user/save',
        method: 'post',
        data
    })
}
export function active(data) {
    return request({
        url: '/user/active',
        method: 'post',
        data
    })
}
export function emsave(data) {
    return request({
        url: '/user/emsave',
        method: 'post',
        data
    })
}
export function dbreq(name,req){
    return request({
        url:'db/req',
        method:'post',
        data:{table_name:name,req}
    })
}
export function getparent(name,req){
    return request({
        url:'/user/getparent',
        method:'get',
    })
}
export function getuser(data){
    return request({
        url:'user/registered/getuser',
        method:'get',
    })
}
export function register(data){
    return request({
        url:'user/register',
        method:'post',
        data
    })
}