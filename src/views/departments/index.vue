<template>
  <div class="departments-container">
    <!-- 头部 -->
    <el-card>
      <terrTools :tree-tools="company" :is-show="false" />
    </el-card>
    <!-- 树状图 -->
    <el-tree :data="departs" :default-expand-all="true" :props="defaultData">
      <terrTools slot-scope="{data}" :tree-tools="data" />
    </el-tree>
  </div>
</template>

<script>
import getDepartments from '@/api/departments'
import terrTools from './components/Tree-Tools.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    terrTools
  },

  data() {
    return {
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      defaultData: {
        label: 'name'
      }
    }
  },
  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const data = await getDepartments()
      console.log(data)
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
