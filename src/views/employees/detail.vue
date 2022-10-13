<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="用户管理" name="first">
            <el-form ref="form" :model="fromData" :rules="fromDataRules" label-width="80px">
              <el-form-item label="账号" prop="username">
                <el-input v-model="fromData.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="fromData.password" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployee">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second"><UserInfo /></el-tab-pane>
          <el-tab-pane label="角色管理" name="third"><JobInfo /></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  name: 'Detail',
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      activeName: Cookies.set('activeName') || 'first',
      fromData: {},
      fromDataRules: {
        username:
        [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 6, message: '长度最小在 6 字符' }
        ]
      }
    }
  },
  created() {
    this.loadEmployeeInfo()
  },
  methods: {
    async loadEmployeeInfo() {
      const res = await getUserDetailById(this.$route.params.id)
      this.fromData = res
    },
    async  updateEmployee() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.fromData)
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
