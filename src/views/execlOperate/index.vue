<template>
  <div class="app-container">
       <el-tabs v-model="activeName" >
            <el-tab-pane label="生成预报表" name="third">
                <el-form
                    :inline="true"
                    :model="listQuery"
                    label-width="100px"
                    size="mini"
                >
                    <el-form-item label="客户" v-if="this.$store.state.user.companyMsg.roles.indexOf('b') == '-1'">
                        <el-select v-model="userId" clearable placeholder="请选择客户">
                        <el-option v-for="(item,index) in userlist" :key="index" :label="item.username" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-button @click="dialogVisible = true" size="mini">生成华磊表</el-button>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="中国报关文件" name="fourth">
                <div class="block">
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      action="#"
                      accept=".xls,.xlsx" 
                      multiple
                      :on-change="beforeUploadVideo"
                      :on-remove="handleRemove"
                      :auto-upload="false"
                      :file-list="fileList"
                      :http-request="uploadVideo"
                    >
                      <template #trigger>
                        <el-button size="small" type="primary">选取文件</el-button>
                        </template>
                        <el-button
                          type="primary"
                          style="margin-left: 10px;" size="small" 
                          @click="uploadVideo()"
                          >生成中国报关文件</el-button
                        >
                        <!-- <el-button  @click="submitUpload">生成中国报关文件</el-button> -->
                        <template #tip>
                        <div class="el-upload__tip">
                            只能上传 excel 文件
                        </div>
                        </template>
                    </el-upload>
                  
                </div>
            </el-tab-pane>
        </el-tabs>
    <div style="margin: 3px;">
      
    </div>
    
    
    <!-- 弹窗 -->
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
    <span>确定导出华磊系统预报表？</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getHl">确 定</el-button>
    </span>
    </el-dialog>
    
  </div>
</template>

<script>
import {getHlExecl,getBgExecl } from '@/api/order'
import {listuser } from '@/api/user'
import Pagination from '@/components/Pagination'
import { ImgUrl } from '@/api/upload'
import { fetchList } from '@/api/role'
export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
        fileList:[],
        activeName: 'third',
        userId:'',
        time:"",
        total: 0,
        loading:false,
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
        userlist:[],
        formData:new FormData(),
    }
  },
  created() {
    // this.batchList()
    this.fetchUserList();
  },
  methods: {
    beforeUploadVideo(file,fileList){
      this.fileList = fileList;
    },
    handleRemove(file,fileList) {
      this.fileList = fileList;
    },
    // 上传视频
    uploadVideo() {
      this.loading = true;
      let { uploadFiles } = this.$refs.upload;
      uploadFiles.forEach((item, index) => {
      	// 遍历文件列表添加视频文件
        this.formData.append("file", item.raw);
      })
      // return
      if (this.fileList.length !== 0) {
        getBgExecl(this.formData).then(res => {
          console.log(res);
          if(res.code == 0) {
              this.$refs.upload.clearFiles();
              this.$message.success("文件生成成功！！！");
              this.fileList = [];
              this.formData = new FormData();
              this.loading = false;
              window.open(res.data,'_blank')
          }else{
            this.$message.error("生成失败，请重新上传！");
            this.formData = new FormData();
            this.$refs.upload.clearFiles();
            this.fileList = [];
            this.loading = false
          }
        })
      } else {
        this.$message.error("上传文件不能为空");
        this.fileList = [];
      }
    },
     fetchUserList() {
        let listQuery = {
        paging: {
          page: 1,
          limit: 100,
        },
        req: {
          parent: this.$store.state.user.companyMsg._id
        },
      }
      listuser(listQuery).then((response) => {
          console.log(response);
        this.userlist = response.data.items
      })
    },
     getHl(){
         if(this.userId == '') {
             this.$message({
                message: '请选择客户！',
                type: 'warning'
            });
             return
         }
         let data = {
             userId:this.userId
         }
         getHlExecl(data).then(res => {
             console.log(res)
             if(res.code == 0) {
                  this.$message({
                        message: '生成成功！',
                        type: 'success'
                    });
                window.open(res.data,'_blank');

            }else {
                 this.$message({
                    message: '获取失败！',
                    type: 'warning'
                });
                // this.$confirm(`请确定上传文件是否正确？`); 
            }
         })
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