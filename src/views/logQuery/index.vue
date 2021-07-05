<template>
  <div class="app-container">
      <div id="header">
        <div id="logo">
          <h1 class="title">{{ $t("message.物流查询") }}</h1>
        </div>
      </div>
      <div id="content">
        <div class="rsform">
          <el-form
            :model="logNumForm"
           ref='log'
            label-width="150px"
            class="demo-ruleForm"
           
          >
            <el-form-item :label=" $t('message.物流编号')"  >
              <el-input
              type="textarea"
                v-model="logNumForm.logNum"
              ></el-input>
              <el-button
              style="margin-top:30px"
                type="primary"
                @click="submitForm(logNumForm)"
                >{{  $t("message.确定") }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 物流信息展示 -->
      <div class="logShow" v-if="logInfo.length > 0">
        <h2>{{ $t("message.物流节点") }}</h2>
        <el-steps
          direction="vertical"
          :active="active"
          finish-status="success"
          v-if="logInfo.length > 0"
          :space="80"
              style="padding-left: 125px;"
        >
          <el-step
            :title="item.track_location"
            :description='item.track_content+item.track_createdate'
            v-for="(item, index) in logInfo"
            :key="index"
          >
             <slot>
               <div>{{item.track_content}}</div>
             </slot>
          
          </el-step>
        </el-steps>
      </div>
  </div>
</template>

<script>
import { LogQuery } from "@/api/log";
// 中文简体
export default {
  data() {
    return {
      logInfo:[],
      active:0,
      logNumForm:{
          logNum:''
      }
    };
  },
  methods:{
      submitForm(logNumForm, table){
 
        if (logNumForm.logNum) {
          var req = { documentCode: logNumForm.logNum.toString()};
          console.log(req,'res')
            LogQuery(req).then((res) => {
             
              console.log(res[0],'数据')
                if(res[0].message){
                    this.$message.error(res[0].message);
                }else{
                   this.logInfo = res[0].data[0].trackDetails.reverse()
                   this.active = logInfo.value.length-1
                   
                }
            });
        } else {
         this.$message.error(this.$t('message.单号不能为空') )
        }
      }
  }
}
</script>

<style lang="scss" >
.logShow {
    margin: 0 auto;
    width: 90%;
}
</style>
