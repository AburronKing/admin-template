## 日历插件
---

目前这是用于城管相关项目的基于cui的日历插件，包含12个月份

最主要的特性：【 *** 日期可多选操作 *** 】，这也是目前大部分日历组件缺失的功能。

### 安装依赖：
     # 切换到cci的私有仓库

      npm install @cci/calender
      或 yarn add @cci/calender

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
  <div class="workdaySet" v-loading="loading">

    <calender @getSelectDay="getSelectDay" @getCalendar="getCalendar" :dayArrProp="dayArr">

      # 此处可slot
      <c-button type="primary" @click="setWorkDay(true)">设为工作日</c-button>
      <c-button type="danger" @click="setWorkDay(false)">设为节假日</c-button>
      
    </calender>

  </div>
</template>

<script>
  import calender from '@cci/calender';

  export default {
    components: {
      calender
    },

    data() {
      return {
        dayArr: [] // 某一年的所有逻辑日期
      }
    },

    methods: {
      // 返回选择的哪一年 用来获取这一年下的所有日期
      getCalendar(year) {

      },
      // 返回选择的日期 年份
      getSelectDay(selectDays, year) {

      }
    }
  }
  
</script>


```



