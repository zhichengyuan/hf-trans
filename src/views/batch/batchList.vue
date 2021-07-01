<template>
  <div class="app-container">
      <div>
          <el-button type="primary" plain @click="dialogVisible=true" size="mini">{{ $t('message.审批') }}</el-button>
          <el-button type="primary" plain @click="getState" size="mini">{{ $t('message.获取审批结果') }}</el-button>
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
          clearable
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('message.开始日期')"
          :end-placeholder="$t('message.结束日期')">
        >
        </el-date-picker>

        <el-button @click="batchList" size="mini">{{
          $t('message.查询')
        }}</el-button>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="list" style="width: 100%">
        <el-table-column
          :label="$t('message.批次号')"
          prop="batchnum"
        ></el-table-column>
        <el-table-column
        :label="$t('message.创建时间')"
          prop="createTime"
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
        @pagination="sendCheck"
      />
    </div>
    <!-- 弹窗 -->
    <el-dialog
    :title="$t('message.提示')"
    :visible.sync="dialogVisible"
    width="30%">
    <span>{{ $t('message.你确认审批吗？？？') }}</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('message.取消') }}</el-button>
        <el-button type="primary" @click="sendCheck">{{ $t('message.确定') }}</el-button>
    </span>
    </el-dialog>
    
  </div>
</template>

<script>
import {sendCheck,batchList,getState } from '@/api/order'
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
     
    }
  },
  created() {
    this.batchList()
  },
  methods: {
    //获取审批结果
    getState(){
      getState().then(res => {
        // console.log(res);
        if(res.code == '0') {
          this.$message({
              message: this.$t('message.结果返回成功'),
              type: 'success',
          })
        }
      })
    },
    //提交审核
     sendCheck(){
         sendCheck().then(res => {
             console.log(res);
             if(res.code == '0') {
                this.$message({
                    message: this.$t('message.审核成功'),
                    type: 'success',
                })
             }
         })
         this.dialogVisible = false;
     },
    //获取批次列表
    batchList(){
        let data = this.listQuery;
        if(this.time != '' && this.time != null) {
          data.req.stime = this.time[0];
          data.req.etime = this.time[1];
        }else {
          delete data.req.stime;
          delete data.req.etime;
        }
        batchList(data).then(res => {
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