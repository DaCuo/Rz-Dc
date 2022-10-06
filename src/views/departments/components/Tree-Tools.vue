<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px; width:100%;">
    <el-col><span>{{ treeTools.name }}</span></el-col>
    <el-col :span="4">
      <el-row>
        <span style="margin-right:10px">{{ treeTools.manager }}</span>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            操作 <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加子部门</el-dropdown-item>
            <el-dropdown-item v-if="isShow" command="edit">编辑部门</el-dropdown-item>
            <el-dropdown-item v-if="isShow" command="del">删除部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeTools: {
      type: Object,
      required: true
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async handleCommand(type) {
      // console.log(type)
      if (type === 'add') {
        this.$emit('addDept', this.treeTools)
      } else if (type === 'edit') {
        // console.log(111)
        this.$emit('editDepts', this.treeTools)
      } else {
        await this.$confirm('确认是否删除该部门', '提示', { type: 'warning' })
        await delDepartments(this.treeTools.id)
        this.$message.success('删除成功')
        this.$emit('parentRefreshList')
      }
    }
  }
  // created() {
  //   console.log(this.treeTools)
  // }

}
</script>

<style>

</style>
