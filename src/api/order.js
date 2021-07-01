import request from '@/utils/request'
// 更改后台
export function orderList(data) {
  return request({
    url: '/api/order/dayslist',
    method: 'post',
    data
  })
}
//保存运单信息
export function transOderSave(obj) {
  return request({
    url: '/api/shipment/save',
    method: 'post',
    data: obj
  })
}
//获取运单列表
export function transOderList(obj) {
  return request({
    url: '/api/shipment/list',
    method: 'post',
    data: obj
  })
}
//获取品名
export function getProductName() {
  return request({
    url: '/api/shipment/getname',
    method: 'post',
    data:{}
  })
}

//批次审核
export function sendCheck() {
  return request({
    url: '/api/shipment/sendcheck',
    method: 'post',
    data:{}
  })
}
//批次审核
export function batchList(data) {
  return request({
    url: '/api/shipment/batchlist',
    method: 'post',
    data
  })
}

//导出华磊系统表
export function getHlExecl(data) {
  return request({
    url: '/api/download/gethl',
    method: 'post',
    data
  })
}
//导出中国海关报关表
export function getBgExecl(form) {
  return request({
    url: '/api/download/getch',
    method: 'post',
    data:form
  })
}
//获取审批结果
export function getState() {
  return request({
    url: '/api/shipment/state',
    method: 'get',
    data:{}
  })
}







export function downloadFile(fid, fname) {
  return process.env.VUE_APP_BASE_API + '/file/download?fname=' + fname + '&fid=' + fid
}