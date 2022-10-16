<template>

  <div>
    <el-upload
      v-loading="loading"
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
var COS = require('cos-js-sdk-v5')

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKID3xkKfldHl37xc5LNo35tCanocDZkiSxE',
  SecretKey: '93jNsztYzCCyXs0tYzUnrhJhqlSwBCyq'
})
export default {
  name: 'UploadImg',
  props: {
    employeeTx: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      previewImgUrl: '',
      loading: false
    }
  },
  watch: {
    employeeTx() {
      this.fileList.push({ name: 'employeeTx', url: this.employeeTx })
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
    httpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'dacuo-1013-1314348588', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // console.log(err || data)
        //  arr 上传成功 null
        if (err) return this.$message.error('图片上传失败')
        this.loading = false
        const imgUrl = { imgUrl: `https://${data.Location}` }
        this.$emit('success', imgUrl)
      })
    },
    onSuccess() {
      console.log('成功的回调')
    },
    beforeUpload(file) {
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
