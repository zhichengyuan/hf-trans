<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="handleCreate"
        >{{ $t('message.新增') }}</el-button
      >
    </div>
    <div class="group-box">
        <div class="group" v-for="(group,index) in groupList" :key='index'>
            <div class="group-icon">
                <i class="el-icon-user"></i>
            </div>
            <div class="group-text">
                <p class="name">{{group.name}}</p>
                <p class="mark"><span>备注：</span>{{group.remark}}</p>
            </div>
            <div class="group-setting">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(group)"></el-button>
            </div>
        </div>
        
    </div>
    <!-- 新增用户 -->
    <el-dialog
      :title="$t('message.人员组设置')"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="100px"
      >
        <el-form-item :label="$t('message.名称')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('message.备注')" >
          <el-input v-model="temp.remark" />
        </el-form-item>
        
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{
          $t('message.取消')
        }}</el-button>
        <el-button type="primary" @click="saveGroupData()">{{
          $t('message.确定')
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->
    <el-dialog
        :title="$t('message.确定要删除该员工吗')"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">{{ $t('message.取消') }}</el-button>
        <el-button type="primary" @click="del()"
          >{{ $t('message.确定') }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addGroup,editGroup,getGroupList  } from '@/api/user'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  name: 'ComplexTable',
  components: { Pagination },

  data() {
    return {
      delInfo:null,
      centerDialogVisible: false,
      total: 0,
      listLoading: true,
      listQuery: {
        req: {
        },
      },

      temp: {
        name:'',
        remark: '',
      },
      isEdit:false,
      groupList:[],
      dialogFormVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: this.$t('message.请输入名称'),
            trigger: 'blur',
          },
          {
            min: 2,
            message: this.$t('message.长度不能少于2个字符'),
            trigger: 'blur',
          },
        ],  
        
      },
    }
  },
  created() {
    this.fetchGroupList()
    // this.fetchStoreList()
  },

  methods: {
    
   
    rolesFilter(roles) {
       if (roles.indexOf('admin') != -1) {
        return this.$t('message.管理员')
      } else if (roles.indexOf('CKY') != -1) {
        return this.$t('message.仓库一')
      } else if (roles.indexOf('ZZC') != -1) {
        return this.$t('message.中转仓库')
      }  else if (roles.indexOf('QG') != -1) {
        return this.$t('message.仓库清关')
      } else if (roles.indexOf('XLFP') != -1) {
        return this.$t('message.线路分配')
      }else if (roles.indexOf('ZT') != -1) {
        return this.$t('message.自提点')
      }else if (roles.indexOf('t') != -1) {
        return this.$t('message.物流管理员')
      }else if (roles.indexOf('B') != -1) {
        return this.$t('message.代理')
      }else if (roles.indexOf('b') != -1) {
        return this.$t('message.客户')
      }else {
        return this.$t('message.员工')
      }
    },
    // 编辑修改用户信息
    handleEdit(data) {
      this.isEdit = true;
      this.temp = data
      this.dialogFormVisible = true
    },
   
    fetchGroupList() {
      getGroupList(this.listQuery).then((response) => {
          console.log(response);
        this.groupList = response.data.items;
      })
    },
    //重置创建用户时的信息
    resetTemp() {
      this.temp = {
        name:'',
        remark: '',
      }
    },
    handleCreate() {
      this.resetTemp()
      // this.dialogStatus = 'create'
      this.isEdit = false;
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    //保存人员组
    saveGroupData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(!this.isEdit) {
              addGroup(this.temp).then((res) => {
                // console.log(res)
                if (res.code == 0) {
                    this.dialogFormVisible = false
                    //   this.fetchGroupList()
                    this.$message({
                        message: this.$t('message.保存成功'),
                        type: 'success',
                    })
                } else if (res.code == 1) {
                    this.$message({
                        showClose: true,
                        message: res.message,
                        type: 'error',
                    })
                }
            })
          }else {
              editGroup(this.temp).then((res) => {
                    // console.log(res)
                    if (res.code == 0) {
                        this.dialogFormVisible = false
                        //   this.fetchGroupList()
                        this.$message({
                            message: this.$t('message.保存成功'),
                            type: 'success',
                        })
                    } else if (res.code == 1) {
                        this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'error',
                        })
                    }
                })
          }
          this.fetchGroupList()
        }
        
      })
    },
  },
}
</script>
<style lang="scss"  scoped>
.group-box{
    display: flex;
    .group{
        height: 200px;
        width: 200px;
        margin-right: 15px;
        // border: 1px solid black;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        position: relative;
        .group-icon{
            text-align: center;
            font-size: 80px;
            line-height: 100px;
        }
        .group-text{
            .name{
                text-align: center;
                font-size: 18px;
                font-weight: bold;
            }
            .mark{
                padding-left: 10px;
            }
            
            /deep/ .el-popover__reference{
                
                display: inline-block !important;
            }
        }
        .group-setting{
             width: 30px;
             text-align: center;
             position: absolute;
             top: 5px;
             right: 5px;
        }
    }
}
.el-popper{
    p{
        padding: 0;
        margin: 0;
    }
    width: 100px !important;
}
.el-form-item {
  margin-bottom: 22px;
}
</style>