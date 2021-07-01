import Vue from 'vue'
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)

let locale1="";
// localStorage.getItem('switchingLanguage')?localStorage.getItem('switchingLanguage'):localStorage.getItem('language') || 'cn'
if(localStorage.getItem('switchingLanguage')){
    locale1 = localStorage.getItem('switchingLanguage');
}else {

        // console.log('当前语言', localStorage.getItem('language'));
        locale1 = "ru"
    
       
}

// console.log('当前语言1',(navigator.language || navigator.browserLanguage).toLowerCase(),navigator.language,navigator.browserLanguage);

let i18n = new VueI18n({
    // locale: localStorage.getItem('language') || 'cn', //初始未选择默认 cn 中文
    locale:  locale1,
    messages,
})
locale.i18n((key, value) => i18n.t(key, value)) //兼容element

export default i18n