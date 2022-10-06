<template>
  <div v-loading="loading" class="departments-container">
    <!-- 头部 -->
    <el-card>
      <terrTools :tree-tools="company" :is-show="false" @addDept="addDept" />
    </el-card>
    <!-- 树状图 -->
    <el-tree :data="departs" :default-expand-all="true" :props="defaultData">
      <terrTools slot-scope="{data}" :tree-tools="data" @addDept="addDept" @editDepts="editDepts" @parentRefreshList="getDepartments" />
    </el-tree>
    <adddept ref="addDept" :dlvissible.sync="dlvissible" :code-node="codeNode" />
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import terrTools from './components/Tree-Tools.vue'
import { tranListToTreeData } from '@/utils'
import adddept from './components/add-dept.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    terrTools,
    adddept
  },

  data() {
    return {
      departs: [],
      defaultData: {
        label: 'name'
      },
      company: {},
      dlvissible: false,
      codeNode: {},
      loading: false
    }
  },
  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyManage, companyName } = await getDepartments()
        this.departs = tranListToTreeData(depts, '')
        this.company = { name: companyName, manager: companyManage, id: '' }
      } catch (error) {
        new Error(error)
      } finally {
        this.loading = false
      }
    },
    addDept(node) {
      this.dlvissible = true
      this.codeNode = node
    },
    editDepts(node) {
      // console.log(node)
      this.codeNode = { ...node }
      this.$refs.addDept.formData = { ...node }
      this.dlvissible = true
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  // background-color: #4576FA;
  .el-tree {
    .el-tree-node__content {
      // padding-right: 20px;
    }
  }
}
</style>
