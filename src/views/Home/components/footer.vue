<template>
  <div class="footer">
    <div class="feedback-container">
      <div class="part">
        <div class="column">
          <div class="Logo"></div>
        </div>

        <div class="contact">
          <div class="item-group">
            <div>
              <router-link to="/">{{$t('message.关于我们')}} </router-link>
              <!-- <router-link to="/">{{i18n.$t('联系我们')}}</router-link> -->
              <!-- <router-link to="/">{{i18n.$t('客户服务')}}</router-link> -->
            
              <router-link to="/"> {{$t('message.加入我们')}}</router-link>
              <!-- <router-link to="/">{{i18n.$t('客户登录')}} </router-link> -->
              <router-link to="/privacy">{{$t('message.网站注意事项')}} </router-link>
              <!-- <router-link to="/">{{i18n.$t('了解更多')}}</router-link> -->
            </div>
          </div>
        </div>
        <div class="companyInfo">
          <div class="info-wrap">
            <div class="item-info">
              <h3 class="content">010-85638059</h3>
              <span class="title">{{$t('message.客户服务')}}</span>
            </div>
            <div class="item-info">
              <h3 class="content">service@benelife.ru</h3>
              <span class="title">{{$t('message.邮箱')}}</span>
            </div>
            <div class="item-info">
              <h3 class="content">
               {{$t('message.延边州珲春边境经济合作区8号小区')}}
                
              </h3>
              <span class="title">{{$t('message.公司地址')}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="notic">
        <div>
          <router-link to="https://support.google.com/business/answer/7388122">Report abuse</router-link>
          </div>
        <div><router-link to="https://www.google.com/business/how-it-works/website">Google</router-link> </div>
      </div> -->
    </div>
  </div>
</template>

<script>

export default {


}
</script>

<style lang='scss' scoped>
@import "@/assets/css/footer/pc.scss";
@import "@/assets/css/footer/pro.scss";
@import "@/assets/css/footer/ipad.scss";
@import "@/assets/css/footer/phone.scss";
@import "@/assets/css/footer/mini.scss";
</style>