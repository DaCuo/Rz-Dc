<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px; width:100%;">
    <el-col><span>{{ treeTools.name }}</span></el-col>
    <el-col :span="4">
      <el-row>
        <span style="margin-right:10px">{{ treeTools.manager }}</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            操作 <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>添加子部门</el-dropdown-item>
            <el-dropdown-item v-if="isShow">编辑部门</el-dropdown-item>
            <el-dropdown-item v-if="isShow">删除部门</el-dropdown-item>
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
  }
  // created() {
  //   console.log(this.treeTools)
  // }

}
</script>

<style>

</style>
