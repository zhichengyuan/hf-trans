<template>
  <div class="app-container records">
    <!-- 审核弹出框 -->
    <el-dialog
      :title="$t('message.审核操作')"
      :visible.sync="dialogFormVisible"
      width="600px"
    >
      <el-form :model="form" :rules="rules" ref="payPic">
        <el-form-item :label="$t('message.审核员:')" prop="auditor">
          <el-input v-model="form.auditor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.请上传审核截图：')" prop="pic">
          <multi-upload drag v-model="form.pic"></multi-upload>
          <span></span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{
          $t('message.取 消')
        }}</el-button>
        <el-button type="primary" @click="reviewed('payPic','0')">{{
          $t('message.确 定')
        }}</el-button>
        <el-button type="danger" @click.stop="reviewed('payPic','1')">
          {{ $t('message.拒绝') }}</el-button
        >
      </div>
    </el-dialog>
    <!-- 交易记录列表 -->
    <div class="list">
      <!-- 查询条件 -->
      <div style="margin: 3px ;display:none">
        <el-form
          :inline="true"
          :model="listQuery"
          label-width="100px"
          size="mini"
        >
          <el-date-picker
            v-model="time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            :start-placeholder="$t('message.开始日期')"
            :end-placeholder="$t('message.结束日期')"
          >
            >
          </el-date-picker>
          <el-button @click="query()" size="mini">{{
            $t('message.查询')
          }}</el-button>
        </el-form>
      </div>
      <!-- 列表 -->
      <el-table :data="rechargeList" style="width: 100%">
        <el-table-column
          align="center"
          prop="_createtime"
          :label="$t('message.日期')"
        >
          <template slot-scope="{ row }">
            <span>{{
              row._createtime | parseTime('{y}-{m}-{d} {h}:{i}')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="applicant"
          :label="$t('message.申请人')"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="applicant"
          :label="$t('message.用户角色')"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.roles == 'b'">b</span>
            <span v-if="scope.row.roles == 'T'">T</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="totalM"
          :label="$t('message.总金额')"
        >
          <template slot-scope="scope">
            <span >{{scope.row.totalM}}₽</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="totalM"
          :label="$t('message.可提现金额')"
        >
          <template slot-scope="scope">
            <span >{{scope.row.totalM}}₽</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="money"
          :label="$t('message.金额')"
        >
          <template slot-scope="scope">
            <span >{{scope.row.money}} ₽</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          :label="$t('message.提现状态')"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.status == '-1'">{{
              $t('message.待审核')
            }}</span>
            <span style="margin-left: 10px" v-if="scope.row.status == '1'">{{
              $t('message.审核失败')
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="money" :label="$t('message.审核员')"> -->
        <!-- </el-table-column> -->
        <!-- <el-table-column
          :label="$t('message.审核凭证')"
          width="100"
          align="center"
        > -->
        <!-- <template slot-scope="scope">
            <img
              style="height: 80px; width: 80px"
              :src="imgurl(scope.row.albumPics[0])"
            />
           
          </template> -->
        <!-- </el-table-column> -->
        <el-table-column
          :label="$t('message.操作')"
          align="center"
          width="150px"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click.stop="reviewing(scope.row)">
              {{ $t('message.审核') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <div class="pagination-container">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.paging.page"
          :page-sizes="[10, 30, 50]"
          :limit.sync="listQuery.paging.limit"
          @pagination="getApplyList"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import { uploadImg, ImgUrl } from '@/api/upload'
import { getparent } from '@/api/user'
import { parseTime } from '@/utils'
import MultiUpload from '@/components/Upload/multiUpload'
import { applyList, audit } from '@/api/order'
import Pagination from '@/components/Pagination'
export default {
  name: 'records',

  components: { Pagination, MultiUpload },
  data() {
    var picList = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error(this.$t('message.请上传充值截图')))
      } else {
        callback()
      }
    }
    return {
      auditoData: {},
      //提现
      approvalStatus: [
        { label: this.$t('message.审核失败'), value: '1' },
        { label: this.$t('message.待审核'), value: '-1' },
      ],
      rules: {
        pic: [
          {
            required: true,
            type: 'array',
            validator: picList,
            trigger: 'blur',
          },
        ],
        auditor: [
          {
            required: true,
            trigger: 'blur',
            message: this.$t('message.请输入审核人'),
          },
        ],
      },
      dialogFormVisible: false,
      form: {
        auditor: '',
        pic: [],
      },
      //   未审核查询
      unReviewed: '',
      review: '0',
      total: 0,
      time: '',
      listQuery: {
        req: {},
        // paging: {
        //   page: 1,
        //   limit: 10,
        // },
        sort: '+id',
      },
      rechargeList: [],
    }
  },
  created() {
    this.getApplyList()
  },
  methods: {
    // 审核列表
    getApplyList() {
      applyList(this.listQuery).then((res) => {
        console.log(res.data[-1])
        this.rechargeList = res.data[-1]
      })
    },
    imgurl(imgid) {
      // if (imgid.slice(0, 4) == 'http') {
      //   return imgid
      // }
      return ImgUrl(imgid)
    },
    // 审核操作
    reviewing(data) {
      this.dialogFormVisible = true
      this.auditoData = data
    },
    reviewed(formName,status) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.auditoData.auditor = this.form.auditor
          this.auditoData.pic = this.form.pic
          this.auditoData.status = status
          console.log(this.auditoData)
          audit(this.auditoData).then((res) => {
            console.log(res)
            this.$message({
              message: this.$t('message.审核完成'),
              type: 'success',
            })
            this.dialogFormVisible = false
            this.getApplyList()
             this.form = {
              auditor: '',
              pic: [],
            }
          })
        } else {
          return false
        }
      })
    },

    query() {
      this.listQuery.req = {}
      if (this.time !== '' && this.time !== null) {
        this.listQuery.req.stime = { $regex: this.time[0] }
        this.listQuery.req.etime = { $regex: this.time[1] }
      }
      //   console.log(this.listQuery)
      this.getApplyList()
    },
  },
}
</script>
<style  lang="scss" scoped>
.pagination-container {
  margin-top: 0;
}
.records {
  .records-b {
    border: 1px solid #ccc;
    height: 100px;
    display: flex;
    justify-content: center;
  }
  .records-box {
    text-align: center;
    box-sizing: border-box;
    h2 {
      padding: 0;
      margin: 10px 0;
      margin-top: 15px;
      font-size: 30px;
    }
    span {
      font-size: 16px;
      color: #ccc;
    }
    .balance {
      color: rgb(255, 165, 55);
    }
  }
  .r-line {
    border-right: 1px solid #ccc;
  }
  .list {
    .title {
      color: rgb(55, 130, 196);
    }
  }
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
.el-collapse-item__header span {
  padding: 0px 100px;
}
</style>