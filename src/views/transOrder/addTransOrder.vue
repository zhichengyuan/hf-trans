<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      :inline="true"
      
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('message.运单编号')" prop="tsCode">
        <el-input v-model="ruleForm.tsCode"></el-input>
      </el-form-item>
      
      <el-form-item :label="$t('message.人员组')" prop="groupId">
        <el-select
          clearable
          v-model="groupId"
          @change="groupChange"
          :placeholder="$t('message.请选择')"
        >
          <el-option
            v-for="(item, index) in groupList"
            :key="index"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('message.收货人')" prop="recid">
        <el-select
          v-model="ruleForm.recid"
          :placeholder="$t('message.请选择收货人')"
        >
          <el-option
            v-for="(item, index) in consigneeList"
            :key="index"
            :label="item.recerNamePart2"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <div class="goodsInfo">
        <div>
          <el-button @click="addGood"
            >{{ $t('message.新增商品') }}</el-button
          >
        </div>
        <div class="goods">
          <div
            class="good"
            v-for="(goodsInfo, index) in ruleForm.goods"
            :key="index"
          >
            <p>{{ $t('message.商品') }}{{index + 1}}</p>
            <div>
              <el-form-item
                :label="$t('message.商品名称')"
                :prop="'goods.' + index + '.goodsName'"
                :rules="{
                  required: true,
                  message: $t('message.此项不能为空'),
                  trigger: 'blur',
                }"
              >
                <el-input v-model="goodsInfo.goodsName"></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('message.商品价格')"
                :prop="'goods.' + index + '.goodsPriceRMB'"
                :rules="[
                  {
                    required: true,
                    message: $t('message.此项不能为空'),
                    trigger: 'blur',
                  },
                  {
                    validator: validatePass,
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model="goodsInfo.goodsPriceRMB"></el-input>
              </el-form-item>

              <el-form-item
                :label="$t('message.数量')"
                :prop="'goods.' + index + '.goodsNum'"
                :rules="[
                  {
                    required: true,
                    message: $t('message.此项不能为空'),
                    trigger: 'blur',
                  },
                  {
                    validator: validatePass1,
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model="goodsInfo.goodsNum"></el-input>
              </el-form-item>

              <el-form-item
                :label="$t('message.重量')"
                :prop="'goods.' + index + '.goodsWight'"
                :rules="[
                  {
                    required: true,
                    message: $t('message.此项不能为空'),
                    trigger: 'blur',
                  },
                  {
                    validator: validatePass,
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model="goodsInfo.goodsWight">
                  <template slot="append">kg</template>
                </el-input>
              </el-form-item>
              <el-form-item
                :label="$t('message.中文品名')"
                filterable
                :prop="'goods.' + index + '.goodsNameCN'"
                :rules="{
                  required: true,
                  message: $t('message.请选择中文品名'),
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="goodsInfo.goodsNameCN"
                  ref="ceshi"
                  filterable
                  :placeholder="$t('message.请选择中文品名')"
                  @change="
                    (value) => {
                      changeGoodsName(value, index)
                    }
                  "
                >
                  <el-option
                    v-for="(item, index) in getProductNameList"
                    :key="index"
                    :label="item.nameCN"
                    :value="item.nameCN"
                  ></el-option>
                  <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item
                class="goodsUrl"
                :label="$t('message.商品连接')"
                :prop="'goods.' + index + '.url'"
                :rules="{
                  required: true,
                  message: $t('message.商品连接不能为空'),
                  trigger: 'blur',
                }"
              >
                <el-input autosize v-model="goodsInfo.url"></el-input>
              </el-form-item>
            </div>

            <el-button @click.prevent="removeGood(goodsInfo)">{{ $t('message.删除') }}</el-button>
          </div>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">{{ $t('message.保存') }}</el-button>
        <el-button @click="resetForm('ruleForm')">{{ $t('message.重置') }}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>{{ $t('message.客官确定保存运单？？？') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('message.取消') }}</el-button>
        <el-button type="primary" @click="confirmSubmit">{{ $t('message.确定') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getConsignee,getGroupList } from '@/api/user'
import { isNumber } from '@/utils/index'
import { transOderSave, getProductName } from '@/api/order'
export default {
  name: 'ComplexTable',
  data() {
    return {
      dialogVisible: false,
      consigneeList: [],
      getProductNameList: [],
      groupId:"",
      ruleForm: {
        tsCode: '', //运单号
        goods: [
          {url: '', //url
        goodsWight: '', //单个物品重量
        customsCode: '', //海关商品编码
        goodsNameCN: '', //商品中文名
        goodsNameRU: '', //商品俄文名
        orderCode: '', //订单号
        goodsPriceRMB: '', //sku价格
        goodsName: '',}
        ], //商品列表
      },
      groupList:[],
      rules: {
        tsCode: [
          { required: true, message:this.$t('message.请输入运单编号') , trigger: 'blur' },
        ],
        goodsWightTotal: [
          { required: true, message:this.$t('message.此项不能为空') , trigger: 'blur' },
          { validate: this.validatePass, trigger: 'blur' },
        ],
        goodsNumTotal: [
          { required: true, message:this.$t('message.此项不能为空') , trigger: 'blur' },
          { validate: this.validatePass1, trigger: 'blur' },
          ,
        ],
        recid: [{ required: true, message:this.$t('message.请选择收货人') , trigger: 'change' }],
      },
    }
  },
  created() {
    this.getConsignee()
    this.getProductName()
    this.fetchGroupList()
  },
  methods: {
    groupChange(val){
      console.log(val);
      this.getConsignee(val);
    },
    //获取人员组
    async fetchGroupList() {
      let data = {
        req:{}
      }
      await getGroupList(data).then((response) => {
        this.groupList = response.data.items;
      })
    },
    //获取品名
    changeGoodsName(val, index) {
      console.log(val, index)
      let obj = this.getProductNameList.find((item) => {
        return item.nameCN === val
      })
      this.ruleForm.goods[index].goodsNameRU = obj.nameRU
      console.log(this.ruleForm.goods[index])
    },
    getProductName() {
      getProductName().then((res) => {
        this.getProductNameList = res.data
        console.log(res)
      })
    },
    //获取收货人
    getConsignee(groupId) {
      let listQuery = {
        req: {
          parent: this.$store.state.user.companyMsg._id,
        },
        sort: '+id',
      }
      if(groupId) {
        listQuery.req.groupId = groupId
      }
      getConsignee(listQuery).then((res) => {
        console.log(res)
        this.consigneeList = res.data.items
      })
    },
    //添加商品
    addGood() {
      console.log(this.ruleForm.goods.length)
      if (!(this.ruleForm.goods.length < 5)) {
        this.$message({
          message: this.$t('message.每个运单最多添加五个商品sku'),
          type: 'warning',
        })
        return
      }
      this.ruleForm.goods.push({
        url: '', //url
        goodsWight: '', //单个物品重量
        customsCode: '', //海关商品编码
        goodsNameCN: '', //商品中文名
        goodsNameRU: '', //商品俄文名
        orderCode: '', //订单号
        goodsPriceRMB: '', //sku价格
        goodsName: '',
      })
    },
    //删除商品
    removeGood(item) {
      var index = this.ruleForm.goods.indexOf(item)
      if (index !== -1) {
        this.ruleForm.goods.splice(index, 1)
      }
    },
    // 确认提交
    confirmSubmit() {
      this.submitForm('ruleForm')
      this.dialogVisible = false
    },
    //提交
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          // return
          transOderSave(this.ruleForm).then((res) => {
            console.log(res)
            if (res.code == 0) {
              this.$message.success(res.msg)
              this.ruleForm = {
                tsCode: '', //运单号
                goods: [], //商品列表
              }
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // 验证
    validatePass(rule, value, callback) {
      console.log('验证', value)
      if (!value) {
        return callback(new Error(this.$t('message.此项不能为空')))
      } else {
        if (isNumber(value)) {
          callback()
        } else {
          callback(new Error(this.$t('message.请输入数字')))
        }
      }
    },
    // 验证
    validatePass1(rule, value, callback) {
      console.log('验证', value)
      if (!value) {
        return callback(new Error(this.$t('message.此项不能为空')))
      } else {
        if (!/^\d+$/.test(value)) {
          callback(new Error(this.$t('message.请输入整数')))
        } else {
          callback()
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-form-item__error{
  position: relative;
}
.goodsInfo {
  // margin-top: 20px;
  .goods {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .good {
      padding: 15px;
      box-sizing: border-box;
      width: 48%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-top: 10px;
      .goodsUrl {
        width: 100%;
        display: flex;
        /deep/ .el-form-item__content {
          flex-grow: 1;
        }
      }
    }
  }
}

.el-collapse-item__header span {
  padding: 0px 100px;
}
/deep/ .el-range-editor--medium .el-range-input {
  font-size: 12px;
}
/deep/ .el-range-editor--medium .el-range-separator {
  line-height: 21px;
  font-size: 12px;
}
/deep/ .el-range-editor--medium .el-range__icon {
  line-height: 21px;
}
.el-range-editor--medium.el-input__inner {
  height: 28px;
}
/deep/ .el-input--medium .el-input__inner {
  height: 28px;
  line-height: 36px;
  font-size: 12px;
}
/deep/ .el-input--medium .el-input__icon {
  line-height: 28px;
}
.el-collapse-item__header span {
  padding: 0px 100px;
}
</style>