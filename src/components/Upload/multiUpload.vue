<template>
  <div>

    <el-upload :disabled="disabled" :action="uploadUrl()" list-type="picture-card" :file-list="fileList"
      :on-remove="handleRemove" :on-success="handleUploadSuccess" :on-preview="handlePreview" :limit="maxCount"
      :on-exceed="handleExceed">
      <i class="el-icon-plus"></i>
      <!-- {{ maxCount-value.length}} -->
      <!-- <div slot="tip" class="el-upload__tip">{{$t('message.最多可传6张 剩余')+ $t('message.张') + (maxCount-value.length) }}</div> -->
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" >
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
  import { uploadImg, ImgUrl } from '@/api/upload'
  export default {
    name: "multiUpload",
    props: {
      disabled: false,
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount: {
        type: Number,
        default: 6
      }
    },
    data() {
      return {
        dataObj: {
          policy: "",
          signature: "",
          key: "",
          ossaccessKeyId: "",
          dir: "",
          host: ""
        },
        dialogVisible: false,
        dialogImageUrl: null
      };
    },
    computed: {
      fileList() {
        let fileList = [];
        for (let i = 0; i < this.value.length; i++) {
          fileList.push({ url: this.value[i] });
        }
        return fileList;
      }
    },
    methods: {
      uploadUrl() {
        return uploadImg()
      },

      emitInput(fileList) {
        let value = [];
        for (let i = 0; i < fileList.length; i++) {
          value.push(fileList[i].url);
        }
        this.$emit("input", value);
      },
      handleRemove(file, fileList) {
        this.emitInput(fileList);
      },

      handlePreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true;
      },

      handleUploadSuccess(res, file) {
        if (res.code == 0) {
          var fid = ImgUrl(res.data.fid)
          var id = res.data.id;
          this.fileList.push({ name: id, url: fid });
          this.emitInput(this.fileList);
        }
      },
      handleExceed(files, fileList) {
        this.$message({
          message: this.$t('message.最多只能上传') + this.maxCount +this.$t('message.张图片'),
          type: "warning",
          duration: 3000
        });
      }
    }
  };
</script>
<style>
</style>