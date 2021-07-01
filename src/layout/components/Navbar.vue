<template>
  <div class="navbar">
    

    <div class="right-menu">
      <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
      <el-form :inline="true" class="demo-form-inline">
        <span>{{$t('message.语言：')}}</span>
        <el-select @change="languageChange" v-model="value" :placeholder="$t('message.点击切换当前语言')">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-form-item :label="$t('message.用户名')" style="text-align:center">
          <el-tag class="formItem">{{$store.getters.username}}</el-tag>
        </el-form-item>
        <el-form-item :label="$t('message.用户角色')">
          <el-tag class="formItem">{{rolesFilter($store.getters.roles)}}</el-tag>
        </el-form-item>
      </el-form>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img src="@/assets/image/logo.png" alt style="height:44px;width:44px" />
            
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">{{$t('message.Log Out')}}</span>
            </el-dropdown-item>
            <!-- <el-dropdown-item divided @click.native="editPassword">
              <span style="display:block;" >修改密码</span>
            </el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    <div style="margin-top: -10px;"><breadcrumb id="breadcrumb-container" class="breadcrumb-container" /></div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="当前用户为:" >
          <el-input type="text" v-model="username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      
    </el-dialog>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import {updataUser } from '@/api/user'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return{
      username:this.$store.getters.username,
     dialogVisible:false,
     options: [{
          value: 'cn',
          label: 'cn'
        }, {
          value: 'ru',
          label: 'ru'
        }],
        value:'',
        ruleForm: {
          pass:'',
          password: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { required: true, message: '原密码不能为空',trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
         
        }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device'])
  },
  created(){
    this.getLanguage();
  },
  methods: {
    //修改密码
    editPassword(){
      this.dialogVisible = true;
      
    },
    //保存修改密码
    submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // console.log(this.ruleForm);
            let data = this.ruleForm;
            delete data.checkPass;
            updataUser(data).then(res => {
              // console.log(res);
              if(res.code == 0) {
                this.$message({
                    message: '修改成功,请重新登录！！！',
                    type: 'success',
                })
                setTimeout(() => {
                    that.logout();
                },1000)
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    languageChange(e){
      // console.log(e,11111)
      let language = e
      
      localStorage.setItem("switchingLanguage",language)
      location.reload()
    },
    //获取当前页面缓存的语言
    getLanguage(){
      if(localStorage.getItem('switchingLanguage')){
        this.value =  localStorage.getItem('switchingLanguage');
      }else {
        this.value =''
        
      }
    },
    rolesFilter(roles) {
       if (roles.indexOf('admin') != -1) {
        return this.$t('message.管理员')
      } else if (roles.indexOf('T') != -1) {
        return this.$t('message.推广者')
      } else if (roles.indexOf('b') != -1) {
        return this.$t('message.商户')
      } else {
        return this.$t('message.未审核')
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item{
  margin-bottom: 20px;
}
.navbar {
  // height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  // min-width: 1120px;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    // float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .float-right{
    float: right;
  }
  .right-menu {
    // float: right;
    height: 100%;
    line-height: 50px;
    position: relative;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      position: absolute;
      top: 0px;
      right: 20px;
      // margin-right: 30px;
      height: 50px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        height: 50px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.formItem {
  margin-top: 10px;
}
</style>
