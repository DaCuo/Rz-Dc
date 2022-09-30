<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="dlvissible" @close="isShow">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDeptFrom" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model.trim="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model.trim="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model.trim="formData.manager" style="width:80%" placeholder="请选择">
          <el-option label="username11" value="username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model.trim="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button size="small" @click="isShow">取消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
export default {
  name: 'Adddept',
  props: {
    dlvissible: {
      type: Boolean,
      default: false
    },
    codeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 部门名称（name）：必填 1-50个字符 / 同级部门中禁止出现重复部门
      // 部门编码（code）：必填 1-50个字符 / 部门编码在整个模块中都不允许重复
      // 部门负责人（manager）：必填
      // 部门介绍 ( introduce)：必填 1-300个字符
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填 1-50个字符', trigger: 'blur' },
          { min: 1, max: 50, trigger: 'blur' },
          { validator: this.nameCode, trigger: 'blur' }

        ],
        code: [
          { required: true, message: '部门编码必填 1-50个字符', trigger: 'blur' },
          { min: 1, max: 50, trigger: 'blur' },
          { validator: this.addCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人必填符' }
        ],
        introduce: [
          { required: true, message: '部门编码必填 1-300个字符', trigger: 'blur' },
          { min: 1, max: 300, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 自定义 部门校验
    async  nameCode(rules, val, callback) {
      const { depts } = await getDepartments()
      const deptstj = depts.filter(item => item.pid === this.codeNode.id).some(item => item.name === val)
      // console.log(deptstj)
      deptstj ? callback(new Error(`该部门中已经有部门使用${val}名称`)) : callback()
    },
    // 自定义 编码校验
    async  addCode(rules, val, callback) {
      const { depts } = await getDepartments()
      console.log(depts)
      const isRepeat = depts.some(item => item.code === val)
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${val}编码`)) : callback()
    },
    isShow() {
      this.$emit('update:dlvissible', false)
      this.$refs.addDeptFrom.resetFields()
    }
  }
}
</script>

<style>

</style>
