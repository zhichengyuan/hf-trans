<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-select
        label-in-value="true"
        :placeholder="$t('message.用户状态')"
        clearable
        v-model="listQuery.req.roles"
        size="mini"
        style="width: 200px"
        class="filter-item"
        @change="changeStatus"
      >
        <el-option
          v-for="(item, index) in userStatusList"
          :key="index"
          :label="item.title"
          :value="item.val"
        />
      </el-select>
    </div> -->
    <el-table
      v-loading="listLoading"
      :data="userlist"
      border
      fit
      size="mini"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column :label="$t('message.商户')" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.地址')"
        prop="password"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.电话')" align="center">
        <template slot-scope="{ row }">
          <!-- <el-input type="text" v-model="row.tel" /> -->
          <span class="link-type">{{ row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('message.角色')" align="center">
        <template slot-scope="{ row }">
          <!-- <span>{{row.roles}}</span> -->
          <!-- <span v-if="row.roles">{{ row.roles }}</span> -->
          <span v-if="row.roles">{{ rolesFilter(row.rol) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.日期')" align="center">
        <template slot-scope="{ row }">
          <span>{{ row._createtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.操作')" align="center">
        <template slot-scope="{ row }">
          <!-- <el-switch
            :disabled="row.username == $store.getters.name"
            active-value=""
            inactive-value="ss"
            @change="statusChange(row)"
            v-model="row.roles[0]"
            active-color="#409EFF"
            inactive-color="#F56C6C"
          /> -->
          <el-button
            type="danger"
            size="mini"
            @click="statusChange(row, true)"
            v-if="row.roles[0] == 'ss'"
            >{{ $t('message.未审核') }}</el-button
          >
          <el-button
            @click="statusChange(row, false)"
            v-else-if="row.rol"
            type="primary"
            size="mini"
            >{{ $t('message.已审核') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.paging.page"
      :limit.sync="listQuery.paging.limit"
      @pagination="fetchUserList"
    />
  </div>
</template>

<script>
import { listuser, save as saveuser, listemployees, active } from '@/api/user'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  name: 'ComplexTable',
  components: { Pagination },

  data() {
    return {
      rol: '',
      delInfo: null,
      centerDialogVisible: false,

      // curRoles: this.$store.getters.roles,
      userStatusList: [
        { title: this.$t('message.待审核'), val: ['ss']},
        { title: this.$t('message.已审核'), val: ['admin','T','b'] },
      ],

      userlist: null,
      storelist: null,
      total: 0,
      listLoading: false,
      listQuery: {
        paging: {
          page: 1,
          limit: 10,
        },
        req: {
          storename: 'admin',
        },
        sort: 'parent,storename,username',
      },
      pvData: [],
      downloadLoading: false,
    }
  },
  created() {
    this.fetchUserList()
    // this.fetchStoreList()
  },

  methods: {
    rolesFilter(roles) {
      if (roles == 'admin') {
        return this.$t('message.管理员')
      } else if (roles == 'T') {
        return this.$t('message.推广者')
      } else if (roles == 'b') {
        return this.$t('message.商户')
      } else {
        return this.$t('message.客户')
      }
    },

    changeStatus() {
      console.log(this.listQuery.req.roles)
      // if (this.listQuery.req.status == '') {
      //   delete this.listQuery.req.status
      // }
      // this.fetchUserList()
    },
    statusChange(userData, data) {
      console.log(userData, 'aaa', data)
      console.log(userData)
      if (data) {
        userData.enable = ''
        userData.roles = [userData.rol]
        console.log(userData, '1111')
        active(userData).then((res) => {
          
          if(res.code == 0){
            this.$message(this.$t('message.审核成功'))
          }else{
            this.$message(this. $t('message.审核失败'))
          }
        })
      } else {
        userData.enable = ''
        userData.roles = ['ss']
        console.log(userData, '222')
        active(userData).then((res) => {
         if(res.code == 0){
            this.$message(this.$t('message.审核成功'))
          }else{
            this.$message(this. $t('message.审核失败'))
          }
        })
      }
    },
    fetchUserList() {
      listuser(this.listQuery).then((response) => {
        this.userlist = response.data.items
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchUserList()
    },
  },
}
</script>
<style  scoped>
.el-form-item {
  margin-bottom: 22px;
}
</style>