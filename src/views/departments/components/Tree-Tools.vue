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
    handleCommand(type) {
      console.log(type)
      if (type === 'add') {
        console.log(1111)
        this.$emit('addDept', this.treeTools)
      } else if (type === 'edit') {
        console.log(111)
      } else {
        console.log(2222)
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
