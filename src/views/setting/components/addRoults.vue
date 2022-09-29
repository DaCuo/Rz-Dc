<template>
  <div>
    <el-dialog
      title="新增角色"
      width="60%"
      :visible.sync="dialogVisible"
      :before-close="edit"
    >
      <el-form
        ref="roleDialogForm"
        label-width="80px"
        :model="formData"
      >
        <el-form-item
          :rules="[{
            required: true,
            message: '角色必填',
            trigger: 'blur'
          }]"
          prop="name"
          label="角色"
        >
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" row="3" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
        <el-button @click="edit">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submit">确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addRole } from '@/api/setting'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      looading: false
    }
  },
  methods: {
    edit() {
      this.$emit('update:dialog-visible', false)
      this.$refs.roleDialogForm.resetFields()
    },
    async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        // 通过表单验证后在数据请求回来之前显示加载属性
        this.loading = true
        await addRole(this.formData)
        this.$emit('refsFormData')
        this.$message.success('新增成功')
        this.edit()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
