## 日历插件
---

目前这是用于城管相关项目的基于element-ui的日历插件，包含12个月份

最主要的特性：【 *** 日期可多选操作 *** 】，这也是目前大部分日历组件缺失的功能。

### 安装依赖：
     # 切换到cci的私有仓库

      npm install @cci/calender-el
      或 yarn add @cci/calender-el

### 参数及回调事件

> ### Calender Attributes


&emsp;`dayArrProp`

&emsp;一年中所有工作日的列表（后台数据返回）

&emsp;默认数据示例：
```
[
  {
    id: null
    date: 1577808000000
    workingDay: true
  },
  ...
]
```

  > ### Calender Event

  &emsp;`getCalendar` 

  &emsp;获取某一年的日历

  &emsp;回调参数：year，年份

  ---

  &emsp;`getSelectDay`

  &emsp;获取所有选中的日期

  &emsp;回调参数：（selectDays, year)， 选中的日期，年份

  ---

### 使用方法

```
<template lang="html">
  <div class="workdaySet">

    <calender-el @getSelectDay="getSelectDay" @getCalendar="getCalendar" :dayArrProp="dayArr">

      # 此处可slot
      <el-button type="primary" @click="setWorkDay(true)">设为工作日</el-button>
      <el-button type="danger" @click="setWorkDay(false)">设为节假日</el-button>
      
    </calender-el>

  </div>
</template>

<script>
  import calenderEl from '@cci/calender-el';

  export default {
    components: {
      calenderEl
    },

    data() {
      return {
        dayArr: [] // 某一年的所有逻辑日期
        selectDayArr: [], // 选中的日期
        year: new Date().getFullYear() // 默认当年
      }
    },

    mounted() {
      // 默认加载当年的日历
      this.$nextTick(() => {
        this.getCalendar()
      })
    },

    methods: {
      // 返回选择的哪一年 用来获取这一年下的所有日期（示例方法）
      getCalendar(year) {
        if(year) {
          this.year = year
        }
        const data = {
          "endDate": `${this.year + 1}-01-01`,
          "startDate": `${this.year - 1}-12-31`
        }
        const res = await management.getWorkDay(data)
        if (res.data.code == 0) {
          this.dayArr = res.data.data
        }
      },
      // 返回选择的日期 年份
      getSelectDay(selectDays, year) {
        this.year = year
        this.selectDayArr = selectDays
      },
      // 设置工作日
      setWorkDay(bol) {
        if(this.selectDayArr.length==0){
          this.$message.warning('没选择日期')
          return
        }
        management.setWorkDay({
          "dates":this.selectDayArr,
          "workingDay": bol,
          "year": this.year,
          "updateUserId": this.userId
        }).then(res=>{
          if(res.data.code==0){
            this.$message.success('设置成功')
            this.getCalendar(this.year);
          }
        })
      }
    }
  }
  
</script>


```



