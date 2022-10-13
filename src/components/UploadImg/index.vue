<template>

  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :on-success="onSuccess"
      :file-list="fileList"
      :http-request="httpRequest"
      :limit="1"
      :before-upload="beforeUpload"
      class="previewImg"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 图片弹层 -->
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <img style="width:100%;" :src="previewImgUrl">
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      previewImgUrl: ''
    }
  },
  methods: {
    onPreview(file) {
      this.previewImgUrl = file.url
      this.dialogVisible = true
    },
    onRemove(file, fileList) {
      this.fileList = fileList
      console.log('文件列表移除文件时的钩子')
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    httpRequest() {
      console.log('哒咩')
    },
    onSuccess() {
      console.log('成功的回调')
    },
    beforeUpload(file) {
      console.log(file)
      const allowType = ['image/png', 'image/jpeg']
      const flag = allowType.includes(file.type)
      const Img1M = file.size > 1 * 1024 * 1024
      if (!flag) {
        this.$message.error('只能上传图片' + allowType.join(',') + '格式')
        return false
      }
      if (Img1M) {
        this.$message.error('图片不能大于1M')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.previewImg{
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
