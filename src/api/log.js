import request from '@/utils/request'
// 更改后台
export function Logistics(name,req) {
    return request({
         url: "db/req",
         method: "post",
        data: { table_name: name,req}
     })
  }
