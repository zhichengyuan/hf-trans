import request from '@/utils/request'
// 订单入库出库
export function receiptSave(obj) {
  return request({
    url: '/warehouse/save',
    method: 'post',
    data: obj
  })
}
