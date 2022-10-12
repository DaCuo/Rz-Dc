
<template>
  <el-dialog
    title="新增员工"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <!-- 表单 -->
    <el-form ref="addEmployee" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择">
          <el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:80%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:80%" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree
          v-if="isShowTreeDate"
          v-loading="loading"
          :data="treeDate"
          default-expand-all
          :props="{label:'name'}"
          style="width:80%"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button type="primary" size="small" @click="addEmployeeFN">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import employeesType from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import { addEmployee } from '@/api/employees'
export default {
  name: 'AddEmployee',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 1, max: 4, message: '1~4', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '必填', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '必填' }
        ],
        timeOfEntry: [
          { required: true, message: '必填' }
        ],
        workNumber: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '必填' }
        ]
      },
      hireType: employeesType.hireType,
      treeDate: [],
      isShowTreeDate: false,
      loading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addEmployee.resetFields()
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.isShowTreeDate = false
    },
    async addEmployeeFN() {
      try {
        await this.$refs.addEmployee.validate()
        await addEmployee(this.formData)
        this.handleClose()
        this.$emit('UpdateList')
      } catch (error) {
        console.log(error)
      }
    },
    async  getDepartments() {
      try {
        this.loading = true
        const { depts } = await getDepartments()
        this.isShowTreeDate = true
        this.treeDate = tranListToTreeData(depts, '')
      } catch (error) {
        new Error(error)
      } finally {
        this.loading = false
      }
    },
    selectNode(data) {
      this.formData.departmentName = data.name
      this.isShowTreeDate = false
    }
  }
}
</script>

<style>

</style>
