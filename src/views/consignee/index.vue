<template>
  <div class="app-container">
      <div>
          <el-button @click="dialogVisible=true" size="mini">{{
            $t('message.新增')
        }}</el-button>
      </div>
    <div style="margin: 3px;display:none">
      <el-form
        :inline="true"
        :model="listQuery"
        label-width="100px"
        size="mini"
      >
        <el-date-picker
          v-model="time"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('message.开始日期')"
          :end-placeholder="$t('message.结束日期')">
          
        >
        </el-date-picker>
        <el-form-item>
            <el-select v-model="protomeVal" :placeholder="$t('message.用户查询')" clearable>
              <el-option
                v-for="item in protomeOptations"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

        <el-button @click="query()" size="mini">{{
          $t('message.查询')
        }}</el-button>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="list" style="width: 100%">
        <el-table-column
          :label="$t('message.姓')"
          prop="recerNamePart1"
        ></el-table-column>
        <el-table-column
        :label="$t('message.名')"
          prop="recerNamePart2"
        ></el-table-column>
        <el-table-column
        :label="$t('message.父姓')"
          prop="recerNamePart3"
        ></el-table-column>
        <el-table-column
        :label="$t('message.电话')"
          prop="recerPhone"
        ></el-table-column>
        <el-table-column
        :label="$t('message.护照号')"
          prop="passPortID"
        ></el-table-column>
        <el-table-column
          :label="$t('message.护照类')"
          prop="PassPortType"
        ></el-table-column>
        <el-table-column
          :label="$t('message.签发日期')"
          prop="passPortDate"
        ></el-table-column>
        <el-table-column
          :label="$t('message.生日')"
          prop="birthday"
        ></el-table-column>
        <el-table-column
          :label="$t('message.州')"
          prop="recerProvince"
        ></el-table-column>
        <el-table-column
          :label="$t('message.城市')"
          prop="recerCity"
        ></el-table-column>
        <el-table-column
          :label="$t('message.街道')"
          prop="recerAddr"
        ></el-table-column>
        <el-table-column
          :label="$t('message.邮编')"
          prop="recerZipCode"
        ></el-table-column>
        
        <el-table-column
        fixed="right"
        :label="$t('message.操作')"
        width="100">
        <template slot-scope="scope">
            <el-button @click="deleteConsignee(scope.row)" type="text" size="small">{{ $t('message.删除') }}</el-button>
            <el-button @click="editConsignee(scope.row)" type="text" size="small">{{ $t('message.编辑') }}</el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.paging.page"
        :page-sizes="[10, 30, 50]"
        :limit.sync="listQuery.paging.limit"
        @pagination="getConsignee"
      />
    </div>
    <!-- 弹窗 -->
    <el-dialog
    :title="$t('message.提示')"
        :visible.sync="dialogVisible"
        width="70%"
        class="propClass"
        >
        <el-form :model="consignee" :rules="rules" ref="consignee" label-width="100px" class="demo-ruleForm consignee clearfix">
            <div class="consigneeLeft">
                <el-form-item :label="$t('message.姓')"  prop="recerNamePart1">
                    <el-input v-model="consignee.recerNamePart1"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.名')"  prop="recerNamePart2">
                    <el-input v-model="consignee.recerNamePart2"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.父姓')"  prop="recerNamePart3">
                    <el-input v-model="consignee.recerNamePart3"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.电话')"  prop="recerPhone">
                    <el-input v-model="consignee.recerPhone"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.护照号')" prop="passPortID">
                    <el-input v-model="consignee.passPortID"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.护照类型')"  prop="PassPortType">
                    <el-input v-model="consignee.PassPortType"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.签发日期')"  prop="passPortDate">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" :placeholder="$t('message.选择日期')" v-model="consignee.passPortDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </div>
            <div class="consigneeRight">
                <el-form-item :label="$t('message.税号')"  prop="eni">
                    <el-input v-model="consignee.eni"></el-input>
                </el-form-item>
                
                <el-form-item :label="$t('message.生日')"  prop="birthday">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" :placeholder="$t('message.选择日期')" v-model="consignee.birthday" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('message.州')"  prop="recerProvince">
                    <el-input v-model="consignee.recerProvince"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.城市')"  prop="recerCity">
                    <el-input v-model="consignee.recerCity"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.街道')"  prop="recerAddr">
                    <el-input v-model="consignee.recerAddr"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.邮编')"  prop="recerZipCode">
                    <el-input v-model="consignee.recerZipCode"></el-input>
                </el-form-item>
            </div>
            <div class="consigneeButton">
                <el-form-item style="width:100%">
                    <el-button type="primary" @click="submitForm('consignee')">{{ $t('message.保存') }}</el-button>
                    <el-button @click="resetForm('consignee')">{{ $t('message.取消') }}</el-button>
                </el-form-item>
            </div>
        </el-form>
        
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible1"
    width="30%">
    <span>{{ $t('message.确认删除此联系人吗？') }}</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">{{ $t('message.取消') }}</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">{{ $t('message.确定') }}</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import {saveCustom,getConsignee } from '@/api/user'
import Pagination from '@/components/Pagination'
import { ImgUrl } from '@/api/upload'
export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      time:"",
      protomeVal:"",
       protomeOptations: [
        { label:this.$t('message.推广者'), value: '0' },
        { label:this.$t('message.小B'), value: '1' },
        ],
      total: 0,
      listQuery: {
        req: {
            parent: this.$store.state.user.companyMsg._id
        },
        paging: {
          page: 1,
          limit: 10,
        },
        sort: '+id',
      },
      listLoading: true,
      list: [],
      formLabelWidth: '120px',
      dialogVisible: false,
      dialogVisible1: false,
      consignee:{
        //   username:'',//用户名
        parent:'',
        recerNamePart1:'',//姓
        recerNamePart2:'',//名
        recerNamePart3:'',//父姓
        recerProvince:'',//州，省
        recerCity:'',//recerCity
        recerAddr:'',//地址/街道住址
        recerZipCode:'', //邮编
        recerPhone:'',//电话号
        passPortID:'',//护照号
        PassPortType:'',//护照类型
        passPortDate:"",//签发日期
        birthday:'',//生日
        eni:''//税号，
      },
    rules: {
        recerNamePart1: [
        { required: true, message:this.$t('message.请输入姓'),  trigger: 'blur' },
        ],
        recerNamePart2: [
        { required: true, message:this.$t('message.请输入名'),  trigger: 'blur' },
        ],
        recerNamePart3: [
        { required: true, message:this.$t('message.请输入父姓'),  trigger: 'blur' },
        ],
        recerPhone: [
            { required: true, message:this.$t('message.请输入电话'),  trigger: 'blur' },
        ],
        passPortID: [
            { required: true, message:this.$t('message.请输入护照号'),  trigger: 'blur' },
        ],
        PassPortType: [
        { required: true, message:this.$t('message.请选择护照类型'),  trigger: 'change' }
        ],
        eni: [
            { required: true, message:this.$t('message.请输入税号'),  trigger: 'blur' },
        ],
        passPortDate: [
            { required: true, message:this.$t('message.请选择日期'),  trigger: 'change' }
        ],
        birthday: [
            {required: true, message:this.$t('message.请选择日期'),  trigger: 'change' }
        ],
        recerProvince: [
            { required: true, message:this.$t('message.请输入州'),  trigger: 'blur' },
        ],
        recerCity: [
            { required: true, message:this.$t('message.请输入城市'),  trigger: 'blur' },
        ],
        recerAddr: [
            { required: true, message:this.$t('message.请输入街道地址'),  trigger: 'blur' },
        ],
        recerZipCode: [
            { required: true, message:this.$t('message.请输入邮编'),  trigger: 'blur' },
        ],
       
       
    },
    }
  },
  created() {
    this.getConsignee()
  },
  methods: {
      //新增收货人
      addConsignee(){
          this.consignee = {
            //   username:'',//用户名
            parent:'',
            recerNamePart1:'',//姓
            recerNamePart2:'',//名
            recerNamePart3:'',//父姓
            recerProvince:'',//州，省
            recerCity:'',//recerCity
            recerAddr:'',//地址/街道住址
            recerZipCode:'', //邮编
            recerPhone:'',//电话号
            passPortID:'',//护照号
            PassPortType:'',//护照类型
            passPortDate:"",//签发日期
            birthday:'',//生日
            eni:''//税号，
        }
      },
        //  保存收获人
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              saveCustom(this.consignee).then(res => {
                  console.log(res);
                if (res.code == 0) {
                    this.dialogFormVisible = false
                    this.getConsignee()
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
                this.dialogVisible = false
              }) 
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除收货人
      deleteConsignee(item) {

      },
      //确认删除
     //   comfirmDelete()
      //编辑收货人
      editConsignee(item) {
          this.consignee = item;
          this.dialogVisible = true;
      },
      //获取收货人列表
    getConsignee(){
        getConsignee(this.listQuery).then(res => {
            this.list = res.data.items
            this.total = res.data.total
        })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    imgurl(imgid) {
      return ImgUrl(imgid)
    },
    
    indexMethod(index) {
      return index++ + 1
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-form-item__error{
  position: relative;
}
.propClass{
    .consignee{
        .consigneeRight,.consigneeLeft,.consigneeButton{
             width: 45%;
             float: left;
        }
        .consigneeButton{
            width: 100%;
        }
    }
}


</style>