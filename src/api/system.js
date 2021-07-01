import request from '@/utils/request'

export function Statistical(req) {
  return request({
    url: 'statistical/income',
    method: 'post',
    data: req
  })
}

