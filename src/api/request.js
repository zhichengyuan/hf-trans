import axios from 'axios'
export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let Promise;
    if (type === "GET") {
        Promise =  axios.get(url, {
        //配置对象
        params: data, //指定请求参数
      });
    } else {
        Promise = axios.post(url, data);
    }
    Promise.then(response=>{
        resolve(response.data)
    }).catch(error=>{
        console.log(error)
        // Message.error('请求出错了'+error.message)
    })
  });
}
