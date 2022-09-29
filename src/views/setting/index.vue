<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理test" name="first">
          <el-row :gutter="10">
            <el-button type="primary" style="margin-left: 10px; margin-bottom:20px" class="el-icon-plus" @click="add">新增角色</el-button>
          </el-row>
          <template>
            <el-table
              v-loading="loading"
              :border="true"
              style="width: 100%"
              :data="pagelist"
            >
              <el-table-column
                label="序号"
                type="index"
                width="120px"
              />
              <el-table-column
                label="角色名称"
                prop="name"
                width="240px"
              />
              <el-table-column
                prop="description"
                label="描述"
              />
              <el-table-column
                label="操作"
              >
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="edit(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="del(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <el-row type="flex" justify="center" align="middle" style="height: 60px">
            <el-pagination
              background
              layout="prev, pager, next, sizes"
              :total="total"
              :page-size.sync="page.pagesize"
              :current-page.sync="page.page"
              :page-sizes="[2, 4, 6,8,10]"
              @current-change="getRolesList"
              @size-change="getRolesList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form :model="CompanyInfo" label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="CompanyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="CompanyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="CompanyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="CompanyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>

        </el-tab-pane>
      </el-tabs>
    </el-card>
    <addRoults ref="editRolt" :dialog-visible.sync="dialogVisible" @refsFormData="getRolesList" />
  </div>
</template>

<script>
import { getUserList, deleteRole, getCompanyInfoAPI } from '@/api/setting'
import addRoults from './components/addRoults.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    addRoults
  },

  data() {
    return {
      pagelist: [],
      page: {
        page: 1,
        pagesize: 10
      },
      loading: false,
      total: 0,
      activeName: 'first',
      dialogVisible: false,
      CompanyInfo: {}
    }
  },
  created() {
    this.getRolesList()
    this.getCompanyInfo()
  },

  methods: {
    async getRolesList() {
      try {
        this.loading = true
        const { total, rows } = await getUserList(this.page)
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.getRolesList()
        }
        this.pagelist = rows
        this.total = total
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    add() {
      this.dialogVisible = true
    },
    edit(row) {
      console.log(row)
      this.$refs.editRolt.formData = { ...row }
      this.dialogVisible = true
    },
    async   del(id) {
      try {
        await this.$confirm('是否确认删除此角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(id)
        this.getRolesList()
      } catch (error) {
        console.log('取消删除')
      }
    },
    async getCompanyInfo() {
      this.CompanyInfo = await getCompanyInfoAPI(this.$store.getters.companyId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
