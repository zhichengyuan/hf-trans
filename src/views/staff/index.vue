<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-select
        label-in-value="true"
        :placeholder="$t('message.用户状态')"
        clearable
        v-model="listQuery.req.status"
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
      </el-select> -->
      <!-- <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="handleFilter"
      >检索</el-button>-->
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
    <el-table
      v-loading="listLoading"
      :data="userlist"
      border
      fit
      size="mini"
      highlight-current-row
      style="width: 100%"
    >
      
      <el-table-column :label="$t('message.昵称')" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('message.密码')"
        prop="password"
        align="center"
      >
        <template>
          <span>******</span>
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
          <span v-if="row.roles">{{ rolesFilter(row.roles) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.创建日期')" align="center">
        <template slot-scope="{ row }">
          <span>{{ row._createtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column :label="$t('message.是否启用')" align="center">
        <template slot-scope="{ row }">
          <el-switch
            :disabled="row.username == $store.getters.name"
            active-value="active"
            inactive-value="disactive"
            @change="statusChange(row)"
            v-model="row.status"
            active-color="#409EFF"
            inactive-color="#F56C6C"
          />
        </template>
      </el-table-column> -->
      <!-- 编辑修改用户信息 -->
      <el-table-column
        :label="$t('message.操作')"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('message.修改信息')"
            placement="top-start"
          >
            <el-button
              round
              size="mini"
              @click="handleEdit(row)"
              icon="el-icon-edit-outline"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('message.删除员工')"
            placement="top-start"
          >
            <el-button
              round
              size="mini"
              @click="isDel(row)"
              icon="el-icon-delete"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改用户信息 -->
    <el-dialog
      :title="$t('message.更改用户信息')"
      :visible.sync="dialogFormVisible2"
      width="500px"
      :before-close="handleClose"
    >
      <el-form
        ref="dataInfo"
        :rules="rules"
        :model="changeTemp"
        label-position="right"
        label-width="100px"
      >
        <div>
          <el-form-item :label="$t('message.用户名')" prop="username">
            <el-input v-model="changeTemp.username" />
          </el-form-item>
        </div>
        <div>
          <el-form-item :label="$t('message.密码')" prop="password">
            <el-input v-model="changeTemp.password" />
          </el-form-item>
        </div>
        <el-form-item  :label="$t('message.角色')" prop="roles">
          <el-select :multiple-limit='1' clearable multiple v-model="changeTemp.roles" @change="selectChange" :placeholder="$t('message.请选择')">
            <el-option
              v-for="(item, index) in rolesOptionsList"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.value == 'B' && $store.state.user.companyMsg.roles.indexOf('B') != -1"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('message.办公城市')" prop="address">
          <el-input v-model="changeTemp.address" />
        </el-form-item>
        <el-form-item :label="$t('message.电话')" prop="tel">
          <el-input v-model="changeTemp.tel" type="text" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{
          $t('message.取消')
        }}</el-button>
        <el-button type="primary" @click="changeInfo()">{{
          $t('message.确定')
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 修改信息完 -->
    <!-- 新增用户 -->
    <el-dialog
      :title="$t('message.新增用户')"
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
        <el-form-item :label="$t('message.用户名')" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item :label="$t('message.角色')" prop="roles">
          <el-select v-model="temp.roles" :multiple-limit='1' clearable multiple :placeholder="$t('message.请选择')">
            <el-option
              v-for="(item, index) in rolesOptionsList"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.value == 'B' && $store.state.user.companyMsg.roles.indexOf('B') != -1"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('message.城市')" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>

        <el-form-item :label="$t('message.电话')" prop="tel">
          <el-input v-model="temp.tel" type="text" />
        </el-form-item>
        <el-form-item :label="$t('message.备注')">
          <el-input v-model="temp.remark" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{
          $t('message.取消')
        }}</el-button>
        <el-button type="primary" @click="saveUserData()">{{
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
import { listuser, save as saveuser,  } from '@/api/user'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  name: 'ComplexTable',
  components: { Pagination },

  data() {
    return {
      delInfo:null,
      centerDialogVisible: false,
      rolesOptionsList: [
        {
          value: 'B',
          label:this.$t('message.代理')
        },
        {
          value: 'b',
          label:this.$t('message.客户')
        },
        
      ],
      
      changeTemp:{},
      userStatusList: [
        { title: this.$t('message.激活'), val: 'active' },
        { title: this.$t('message.禁用'), val: 'disactive' },
      ],

      userlist: null,
      storelist: null,
      total: 0,
      listLoading: true,
      listQuery: {
        paging: {
          page: 1,
          limit: 10,
        },
        req: {
          parent: this.$store.state.user.companyMsg._id
        },
      },

      temp: {
        // email: '',
        // emid: '',
        address: '',
        storename: '',
        roles: [],
        remark: '',
        tel: '',
        username: '',
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogPvVisible: false,
      pvData: [],
      rules: {
        password: {
          required: true,
          min: 5,
          max: 10,
          message: this.$t('message.长度在 5 到 10 个字符'),
          trigger: 'blur',
        },
        language: [
          {
            required: true,
            message: this.$t('message.请选择语言'),
            trigger: 'change',
          },
        ],
        roles: [
          {
            required: true,
            message: this.$t('message.请选择身份'),
            trigger: 'change',
          },
        ],
        storename: [
          { required: true, message: 'type is required', trigger: 'blur' },
          {
            min: 2,
            message: this.$t('message.长度不能少于2个字符'),
            trigger: 'change',
          },
        ],
        username: [
          {
            required: true,
            message: this.$t('message.请输入用户名'),
            trigger: 'blur',
          },
          {
            min: 2,
            message: this.$t('message.长度不能少于2个字符'),
            trigger: 'blur',
          },
        ],

        emid: [
          {
            required: true,
            message: this.$t('message.请输入员工编号'),
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: this.$t('message.请输入地址'),
            trigger: 'blur',
          },
        ],
        tel: [
          {
            required: true,
            trigger: 'blur',
            message: this.$t('message.请输入电话'),
          },
          {
            min: 11,
            max: 11,
            message: this.$t('message.号码格式不正确'),
            trigger: 'change',
          },
        ],
      },
      downloadLoading: false,
    }
  },
  created() {
    this.fetchUserList()
    // this.fetchStoreList()
  },

  methods: {
    selectChange(value) {
      console.log(value);
    },
    isDel(row){
      this.delInfo = row
      this.centerDialogVisible = true
    },
    // 删除员工
    del() {
      this.delInfo._delete = ''
      saveuser(this.delInfo).then((res) => {
        if (res.code == 0) {
          this.dialogFormVisible2 = false
          this.fetchUserList()
          this.$notify({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000,
          })
        }
      })
      this.centerDialogVisible = false
      this.fetchUserList()
    },
    handleClose() {
      this.fetchUserList()
      this.dialogFormVisible2 = false
    },
    // 修改用户信息
    changeInfo() {
      console.log(this.changeTemp);
      this.changeTemp.nickname = this.changeTemp.username;
      
      this.$refs['dataInfo'].validate((valid) => {
        if (valid) {
          // const roles = this.changeTemp.roles;
          // this.changeTemp.roles = [];
          // this.changeTemp.roles.push(roles)
          saveuser(this.changeTemp).then((res) => {
            if (res.code == 0) {
              this.dialogFormVisible2 = false
              this.fetchUserList()
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000,
              })
            }
          })
        }
      })
    },
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
      console.log('ssss',data);
      // data.roles = data.roles[0]
      console.log('ssssddd',data.roles)
      this.changeTemp = data
      this.dialogFormVisible2 = true
    },
    changeStatus() {
      if (this.listQuery.req.status == '') {
        delete this.listQuery.req.status
      }
      this.fetchUserList()
    },
    statusChange(userData) {
      userData.enable = ''
      saveuser(userData).then((res) => {
        this.$message(this.$t('message.状态已改变'))
      })
    },
    fetchUserList() {
      this.listLoading=true;
      listuser(this.listQuery).then((response) => {
        this.userlist = response.data.items;
        this.total = response.data.total;
        this.listLoading=false;
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchUserList()
    },
    //重置创建用户时的信息
    resetTemp() {
      this.temp = {
        // emid: '',
        // storename: '',
        address: '',
        storename: '',
        roles: [],
        remark: '',
        tel: '',
        username: '',
      }
    },
    handleCreate() {
      this.resetTemp()
      // this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    //保存用户信息
    saveUserData() {
      if (this.$store.getters.roles.indexOf('admin') != -1) {
        // this.temp.parent = 'admin'
        this.temp.storename = 'admin'
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.nickname = this.temp.username
          this.temp.password = 'Hfhj@2020';
          console.log(this.temp)
          // return
          saveuser(this.temp).then((res) => {
            // console.log(res)
            if (res.code == 0) {
              this.dialogFormVisible = false
              this.fetchUserList()
              this.$message({
                message: this.$t('message.新增成功'),
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
        
      })
    },
  },
}
</script>
<style  scoped>
.el-form-item {
  margin-bottom: 22px;
}
</style>