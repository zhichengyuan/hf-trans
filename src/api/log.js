import request from '@/utils/request'
import request1 from './request'
// 更改后台
export function Logistics(name,req) {
    return request({
         url: "db/req",
         method: "post",
        data: { table_name: name,req}
     })
  }
// 更改后台
const Base = "";
const reqApi ='http://118.190.143.91:8082' 
// http://118.190.143.91:8082/selectTrack.htm?documentCode=8131274345135935
export const LogQuery= (req) =>
request1(reqApi + "/selectTrack.htm", req);