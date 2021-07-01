<template>
  <div>
    <!-- <h1>{{ $t('message.欢迎来到推广系统') }}</h1> -->
    <h3 class="authority" v-if="role == 'ss'">
      {{ $t('message.您的推广权限正在审核中') }}
    </h3>
    <el-row>
      <el-col class="main">
        <h4>{{ $t('message.联系方式') }}</h4>
        <el-col :span="12" class="main-text">
          <span>{{ $t('message.电话：') }}</span
          ><span class="text">010-8563-8059</span>
        </el-col>
      
      <!-- <el-col :span="12" class="main-text">
        <span>Facebook：</span
        ><span class="text">11111111111</span>
      </el-col> -->
      <el-col :span="12" class="main-text">
        <span>{{ $t('message.邮箱:') }}</span
        ><span class="text">service@benelife.ru</span>
      </el-col>
</el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { Statistical } from '@/api/system'
export default {
  components: {
    CountTo,
  },
  data() {
    return {
      role: '',
    }
  },
  created() {
    this.role = this.$store.getters.roles[0]
    console.log(this.$store.getters.roles[0])
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.main {
  background: rgb(240, 242, 245);
  padding-bottom: 10px;
  h4 {
    padding: 0;
    padding-left: 30px;
    line-height: 40px;
    border-bottom: 1px solid #cccf;
  }
  .main-text {
    line-height: 30px;
    padding-left: 50px;
    .text {
      color: rgba(255, 102, 0, 0.904);
      font-size: 18px;
    }
  }
}
</style>