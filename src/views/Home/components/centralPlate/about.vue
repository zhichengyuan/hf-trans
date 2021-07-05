


<template>
  <div class="contect">
    <div class="title">{{ $t('message.关于我们') }}</div>
    <div class="about-block">
      <div class="left-info">
        <div class="desc"></div>
      </div>
      <div class="right-info">
        <div class="feature-info">
          {{
            $t('message.珲春海方弘景科技有限公司成立于2019年，历经10多年的发展，拥有150余名物流精英， 10余家国内外站点，10000平方米仓库面积，600多个海外平台及代理，致力于为您提供更快速、专业的中俄物流服务。'
            )
          }}
          {{
          $t('message.未来，海方弘景企业将为推动物流行业的升级发展、服务人民对美好生活的向往而持续奋斗，承担起新时代赋予我们的产业责任和社会责任，携手更多的合作伙伴共同成长、共同创造，为物流行业的发展建设提供更多的助力，为人民的美好生活做出更大的贡献。'
          )
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" >
@import '@/assets/css/about/pc.scss';
@import '@/assets/css/about/pro.scss';
@import '@/assets/css/about/ipad.scss';
@import '@/assets/css/about/phone.scss';
@import '@/assets/css/about/mini.scss';
</style>