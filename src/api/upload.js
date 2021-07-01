
//let ImgSerevr = "http://58.87.108.47:7777"

let ImgSerevr = process.env.VUE_APP_BASE_API
let imgUrlPath = ImgSerevr + "/avatar/img?id="
export function uploadImg() {
    return ImgSerevr + '/avatar/upload'
}
export function uploadExcel() {
    return ImgSerevr + '/trans/upload'
}
export function ImgUrl(id) {
    if (id == undefined) { return '' }
    return ImgUrlPath + id
    //return process.env.VUE_APP_BASE_API + '/avatar/img?id=' + id
}
export function ImgID(url) {
    if (url == undefined) { return '' }
    return url.replace(ImgUrlPath, "")
    return url.replace(process.env.VUE_APP_BASE_API + '/avatar/img?id=', "")
}
export let ImgUrlPath = imgUrlPath