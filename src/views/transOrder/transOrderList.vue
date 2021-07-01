<template>
  <div class="app-container">
      <div>
          <!-- <el-button @click="dialogVisible=true" size="mini">{{
          $t('message.新增')
        }}</el-button> -->
      </div>
    <div style="margin: 3px;">
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
          clearable
          range-separator="至"
          :start-placeholder="$t('message.开始日期')"
          :end-placeholder="$t('message.结束日期')">
          
        >
        </el-date-picker>
        <el-form-item label="客户" v-if="this.$store.state.user.companyMsg.roles.indexOf('b') == '-1'">
            <el-select v-model="listQuery.req.userId" clearable placeholder="请选择客户">
            <el-option v-for="(item,index) in userlist" :key="index" :label="item.username" :value="item._id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="运单状态" v-if="this.$store.state.user.companyMsg.roles.indexOf('b') == '-1'">
            <el-select v-model="listQuery.req.status" clearable placeholder="运单状态">
            <el-option label="未提交审核" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="审核未通过" value="2"></el-option>
            <el-option label="已入库物流系统" value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-button @click="transOderList" size="mini">{{
          $t('message.查询')
        }}</el-button>
      </el-form>
    </div>
    <div class="table-container">
      <el-table  v-loading="listLoading" :data="list" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table ref="productTable" style="width: 100%; " border :data="scope.row.goodsInfo">
              <el-table-column type="selection" width="40" align="center"></el-table-column>
              <el-table-column
                :label="$t('message.序号')"
                type="index"
                width="60"
                align="center"
                :index="indexMethod"
              ></el-table-column>
              
              <el-table-column :label="$t('message.商品名称')" align="center" prop="goodsNameCN"></el-table-column>
              <el-table-column label="商品数量" align="center" prop="goodsNum"></el-table-column>
              <el-table-column label="商品价格" align="center" prop="goodsPriceRMB">
                <template slot-scope="{ row }">
                  <span>{{row.goodsPriceRMB}}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品链接" align="center" prop="url"></el-table-column>
              
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="运单编号"
          prop="tsCode"
        >
        
        </el-table-column>
        <el-table-column
          label="商品总数量"
          prop="goodsNumTotal"
        ></el-table-column>
        <el-table-column
          label="商品总重量"
          prop="goodsWightTotal"
        ></el-table-column>
        <el-table-column
          label="收货人姓名"
          prop="recerInfo.recerNamePart2"
        >
        </el-table-column>
        <el-table-column
          label="收货人电话"
          prop="recerInfo.recerPhone"
        >
        </el-table-column>
        <el-table-column
        v-if="isShow"
          label="状态"
          prop="recerInfo.recerPhone"
        >
        <template slot-scope="{ row }">
          <span class="isCheck" v-if="row.isCheck == '0'">未提交审核</span>
          <span class="isPass" v-else-if="row.isCheck == '1' && row.isPass=='1'">审核通过</span>
          <span class="NPass" v-else-if="row.isCheck == '1' && row.isPass=='0'">未审核通过</span>
          <span class="isSendHL" v-else-if="isSendHL=='1'">已导出华磊表格</span>
        </template>
        </el-table-column>
         
        
        
        
        <!-- <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
            <el-button @click="deleteConsignee(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="editConsignee(scope.row)" type="text" size="small">编辑</el-button>
        </template>
        </el-table-column> -->
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
        @pagination="transOderList"
      />
    </div>

    
  </div>
</template>

<script>
import {transOderList } from '@/api/order'
import { listuser } from '@/api/user'
import Pagination from '@/components/Pagination'
import { ImgUrl } from '@/api/upload'
export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      time:"",
      total: 0,
      listQuery: {
        req: {
          parent: this.$store.state.user.companyMsg._id,
          userId:'',
          status:'',
        },
        paging: {
          page: 1,
          limit: 10,
        },
        sort: '+id',
      },
      listLoading: true,
      list: [],
      userlist:[],
      formLabelWidth: '120px',
      isShow:false,
    }
  },
  created() {
    this.isConsignee();
    this.transOderList();
    this.fetchUserList();

  },
  methods: {
    isConsignee(){
      if(this.$store.state.user.roles.indexOf('b') =='-1'){
        this.isShow= true;
      }
    },
    //获取客户
    fetchUserList() {
      let data ={
        req: {
          parent: this.$store.state.user.companyMsg._id
        },
        paging: {
          page: 1,
          limit: 100,
        },
        sort: '+id',
      }
      listuser(data).then((response) => {
        console.log('用户',response);
        this.userlist = response.data.items
      })
    },
      //获取运单列表
      transOderList(){
        this.listLoading = true;
        console.log(this.listQuery.req)
        let data = Object.assign({}, this.listQuery) ;
        if(this.time != '' && this.time != null) {
          data.req.stime = this.time[0];
          data.req.etime = this.time[1];
        }else {
          delete data.req.stime;
          delete data.req.etime;
        }
        console.log(this.listQuery.req);
        if(this.listQuery.req.userId == '' || this.listQuery.req.userId == null) {
          delete data.req.userId;
        }
        if(this.listQuery.req.status == '' || this.listQuery.req.status == null) {
          delete data.req.status;
        }
        // if(this.$store.state.user.roles.indexOf('admin') != -1){
        //   data.req.parent = data.req.userId;
        //   delete data.req.userId;
        // }
        console.log(this.listQuery.req);
        transOderList(data).then(res => {
          console.log(res);
          this.list = res.data.items;
          this.total = res.data.total;
          this.listLoading = false;
        })
      },
        //  保存收获人
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    imgurl(imgid) {
      return ImgUrl(imgid)
    },
    // 请求订单接口
    getOrderList() {
     results().then(res=>{
        console.log(res)
        this.list = res.data.user
      })
    },
    indexMethod(index) {
      return index++ + 1
    },
  },
}
</script>
<style lang="scss" scoped>
.isCheck{
  color: red;
}
.isPass{
  color: green;
}
.NPass{
  color: rgb(199, 176, 44);
}
.isSendHL{
  color: blues;
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