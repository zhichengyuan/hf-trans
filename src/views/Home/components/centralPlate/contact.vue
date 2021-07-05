<template>
  <div class='contect'>
    <div class="content-block">
      <div class="left-info">
        <div class="title">{{$t('message.联系我们')}}</div>
        <div class="desc">{{$t('message.您有任何问题，请与我们联系')}}service@benelife.ru</div>
      </div>
      <div class="right-info">
        <div class="input">
          <div class="title">{{$t('message.邮箱')}}</div>
          <input type="text" placeholder="Your email address" />
        </div>
        <div class="input">
          <div class="title">{{$t('message.信息')}}</div>
          <textarea type="text" placeholder="Type here" />
        </div>
        <div class="btn">
          <div class="btn-submit">{{$t('message.提交')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {


}
</script>

<style lang="scss" scoped>
@import '@/assets/css/contact/pc.scss';
@import '@/assets/css/contact/pro.scss';
@import '@/assets/css/contact/ipad.scss';
@import '@/assets/css/contact/phone.scss';
@import '@/assets/css/contact/mini.scss';
</style>