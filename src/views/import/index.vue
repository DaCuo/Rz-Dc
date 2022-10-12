<template>
  <UploadExcel :on-success="onsuccess" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async onsuccess({ header, results }) {
      console.log(header, results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const infoArr = []
      results.forEach(item => {
        const userObj = {}
        Object.keys(item).forEach(key => {
          userObj[userRelations[key]] = item[key]
        })
        infoArr.push(userObj)
      })
      console.log(infoArr)
      await importEmployee(infoArr)
      this.$message.success('批量导入成功')
      console.log(222)
      this.$router.back()
      console.log(111)
    }
  }
}
</script>

<style>

</style>
