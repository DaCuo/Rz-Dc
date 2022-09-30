<template>
  <div class="departments-container">
    <!-- 头部 -->
    <el-card>
      <terrTools :tree-tools="company" :is-show="false" @addDept="addDept" />
    </el-card>
    <!-- 树状图 -->
    <el-tree :data="departs" :default-expand-all="true" :props="defaultData">
      <terrTools slot-scope="{data}" :tree-tools="data" @addDept="addDept" />
    </el-tree>
    <adddept :dlvissible.sync="dlvissible" :code-node="codeNode" />
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
      codeNode: {}
    }
  },
  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const { depts, companyManage, companyName } = await getDepartments()
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
    },
    addDept(node) {
      this.dlvissible = true
      console.log({ node })
      this.codeNode = node
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
