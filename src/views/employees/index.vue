<template>
  <div class="app-container">
    <PageTools>
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="addemployee">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 新增员工弹窗 -->
    <AddEmployee :dialog-visible.sync="dialogVisible" @UpdateList="getEmployeeList" />
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="employeeList">
        <el-table-column label="序号" sortable="" width="80">
          <template scope="{$index}">
            {{ (page.page - 1) * 10 + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="头像" prop="staffPhoto">
          <template slot-scope="{row}">
            <img style="width:100px;height:100px;" :src="row.staffPhoto" alt="" @click="displayPic(row.staffPhoto)">
          </template>
          <!-- 预览头像 -->
        </el-table-column>
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn">
          <!-- <template slot-scope="{row}">
          </template> -->
        </el-table-column>
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{row}">
            {{ dayjs(row.timeOfEntry).format('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{row}">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column> -->
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{row}">
            <el-switch
              :value="row.enableState===1"
            />
          </template>

        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="seeDetail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 2.75rem">
        <el-pagination
          :total="total"
          layout="prev, pager, next,sizes,total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[10,20,50]"
          @size-change="getEmployeeList"
          @current-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <el-dialog
      title="预览头像"
      :visible.sync="dialogVisiblePic"
      width="50%"
    >
      <canvas ref="myCanvas" />
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import employeesType from '@/api/constant/employees'
import { getEmployeeList, delEmployee } from '@/api/employees'
import AddEmployee from './components/AddEmployee.vue'
import QRCode from 'qrcode'
export default {
  name: 'HrsaasIndex',
  components: {
    AddEmployee
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      dayjs,
      employeeList: [],
      total: 0,
      loading: false,
      hireType: employeesType.hireType,
      dialogVisible: false,
      dialogVisiblePic: false
    }
  },
  computed: {
    employeesHireType() {
      return this.hireType.filter(ele => {
        // console.log(ele)
      })
    }
  },
  created() {
    this.getEmployeeList()
    // console.log(this)
  },
  methods: {
    async getEmployeeList() {
      // const res = await getEmployeeList(this.page)
      try {
        const { rows, total } = await getEmployeeList(this.page)
        this.employeeList = rows
        this.total = total
      } catch (error) {
        new Error(error)
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellValue) {
      // console.log({ row, column, cellValue })
      const res = this.hireType.find(ele => ele.id === cellValue)
      return !res ? '' : res.value
    },
    addemployee() {
      this.dialogVisible = true
    },
    async del(id) {
      try {
        await this.$confirm('确认删除改员工吗', '提示', { type: 'warning' })
        await delEmployee(id)
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    async exportExcel() {
      //  文件懒加载   import 可以当做一个函数来使用并返回一个Promise对象
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeeList({ page: 1, size: this.total })
      const exportExcelMapPath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      // 表头数据
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map(item => {
        return header.map(h => {
          if (h === '聘用形式') {
            const find = this.hireType.find(ele => {
              return ele.id === item[exportExcelMapPath[h]]
            })
            return !find ? '未知' : find.value
          }
          return item[exportExcelMapPath[h]]
        })
      })

      export_json_to_excel({
        header, // 表头 必填
        data, // 具体数据 必填
        filename: '员工表格', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    },
    seeDetail({ id }) {
      this.$router.push(`/detail/${id}`)
    },
    displayPic(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户没上传头像')
      this.dialogVisiblePic = true
      this.$nextTick(() => {
        // 此时可以确认已经有ref对象了
        QRCode.toCanvas(this.$refs.myCanvas, staffPhoto) // 将地址转化成二维码
        // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
