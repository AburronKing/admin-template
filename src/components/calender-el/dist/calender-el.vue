<!-- 全年日历 -->
<template lang="html">
  <div class="calenderYear" v-loading="loading">
    <div class="top">
      <div class="select-year">
        选择年份：
        <el-date-picker
          v-model="yearDate"
          value-format="yyyy"
          type="year"
          @change="selectYear"
          style="width:120px"
          :clearable="false"
          :editable="false"
          placeholder="选择年">
        </el-date-picker>
      </div>
      <div style="opacity: 0;">{{selectDayArr.length}}</div>
      <div class="btns">
        <slot></slot>
      </div>
    </div>
    <div class="scrollBox">
      <div class="allday">
        <el-card shadow="hover" class="month-card" v-for="(item,index) in allYear" :key="index" >
          <div class="title">
            {{index+1}}月
          </div>
          <div class="calendarBox">
            <div class="week-bar">
              <div class="list list-week" v-for="item1 in week">
                {{item1}}
              </div>
            </div>
            <div class="listDay list" v-for="(item2,index2) in item.arr" :class="{act: item2.act, work: item2.workingDay}" @click="selectDay(index,index2,item2)">
              {{index2+1}}
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dayArrProp: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      yearDate: new Date(),
      year: new Date().getFullYear(),
      week: ['日', '一', '二', '三', '四', '五', '六'],
      allYear: [],
      dayArr: [], // 用来存一下所有工作日
      selectDayArr: [], // 选中的日期
      loading: true
    }
  },
  computed: {
    allYearTimes() {
      const yearFirstTime = new Date(`${this.year}/01/01 00:00:00`).getTime();
      const yearLastTime = new Date(`${this.year+1}/01/01 00:00:00`).getTime();
      return yearLastTime - yearFirstTime;
    },
    yearFirstTime() {
      return new Date(`${this.year}/01/01 00:00:00`).getTime();
    }
  },
  watch: {
    dayArrProp(n) {
      if(n && n.length) {
        this.dayArr = n;
        for (const i of n) {
          // 给所有日期加上act属性，用来做选中样式
          i.act = false
          delete i.id
        }
        this.selectDayArr = [];
        this.getMonthDays();
      } else {
        this.$message.error('日期获取失败')
      }
    }
  },
  created() {
    if(!this.dayArrProp.length) {
      this.getAllWorkDay();
    }
  },
  methods: {
    // 获取一年内所有的工作日  在没有传入dayArrProp时调用
    getAllWorkDay() {
      for (let j = 0; j < this.allYearTimes; j += 86400000) {
        const dateTime = this.yearFirstTime + j
        let week = new Date(dateTime).getDay()
        if(week > 0 && week < 6) {
          const obj = {
            date: Number(dateTime),
            workingDay: true,
            act: false
          }
          this.dayArr.push(obj)
        }
      }
      this.getMonthDays();
    },
    getMonthDays() { // 本月有多少天
      this.allYear = []
      const arr = [] // 暂存计算后的当年所有天数

      for (let j = 0; j < this.allYearTimes; j += 86400000) {
        const dateTime = this.yearFirstTime + j
        for (let k = 0; k < this.dayArr.length; k++) {
          if (dateTime === this.dayArr[k].date) {
            arr.push(this.dayArr[k])
            break
          } else { // 默认的非工作日
            if ((dateTime !== this.dayArr[this.dayArr.length - 1]) && (k == this.dayArr.length - 1)) {
              arr.push({
                date: dateTime,
                workingDay: false,
                act: false
              })
            }
          }
        }
      }
      this.dayArr = arr
      // 获取每月的日期 判断是周末还是工作日
      for (let i = 0; i < 12; i++) {
        let obj = {},
          month = this.year + "-" + (i + 1).toString().padStart(2, '00')
        obj.dayNum = new Date(month.split('-')[0], month.split('-')[1], 0).getDate() // 每月天数
        obj.weekOfFirstDay = new Date(month + '/01').getDay() // 每月第一天的星期
        obj.month = month
        const perMonthDay = [] // 根据每月天数 截取所有天数 存进数组

        for (let j = 0; j < this.dayArr.length; j++) {
          perMonthDay.push(this.dayArr[j])
          if (j == obj.dayNum - 1) {
            this.dayArr.splice(0, obj.dayNum)
            obj.arr = perMonthDay
            break;
          }
        }

        this.allYear.push(obj)
      }
      console.log(this.allYear);
      this.setFirstDayOfWeekStyle()
      this.loading = false
    },
    /**
     * @description: 选择年份 重新设置所在年的日历
     * @param {*} year 年份
     * @return {*}
     */    
    selectYear(year) {
      this.year = parseInt(year);
      if(this.dayArrProp.length) {
        this.$emit('getCalendar', this.year);
      } else {
        this.getAllWorkDay();
      }
    },
    // 根据第一天的星期几,设置其样式
    setFirstDayOfWeekStyle() {
      const allYear = this.allYear
      this.$nextTick(() => {
        for (let i = 0; i < 12; i++) {
          document.getElementsByClassName('month-card')[i].getElementsByClassName('listDay')[0].style.marginLeft = allYear[i].weekOfFirstDay == 0 ? '8px' : (allYear[i].weekOfFirstDay * 38 + 8) + 'px';
        }
      })
    },
    /**
     * @description: 获取所有选中的日期
     * @param {*} index 月份的index
     * @param {*} index2 日期的index
     * @param {*} item2 日期的item
     * @return {*}
     */    
    selectDay(index, index2, item2) {
      if (item2.act) {
        this.$set(item2, 'act', false)
      } else {
        this.$set(item2, 'act', true)
      }
      const selectDay = this.year + '-' + (index + 1).toString().padStart(2, '00') + '-' + (index2 + 1).toString().padStart(2, '00')

      let j = 0
      if (this.selectDayArr && this.selectDayArr.length) {
        for (let i = 0; i < this.selectDayArr.length; i++) {
          if (selectDay === this.selectDayArr[i]) {
            this.selectDayArr.splice(i, 1)
            break;
          } else j++
          if (j == this.selectDayArr.length) {
            this.selectDayArr.push(selectDay)
            break
          }
        }
      } else {
        this.selectDayArr.push(selectDay)
      }
      this.$emit('getSelectDay', this.selectDayArr, this.year)
    }
  }
}
</script>

<style lang="scss">
.calenderYear {
    min-width: 900px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .scrollBox{
      height: calc(100% - 40px);
      .el-scrollbar{
        height: 100%;
      }
    }
    .top {
        height: 36px;
        display: flex;
        justify-content: space-between;
        .select-year {
          font-size: 14px;
        }
    }
    .allday {
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        margin-left: -14px;
        font-size: 14px;
        margin-top: 10px;
        .month-card {
            width: 300px;
            height: 290px;
            margin: 0 0 10px 10px;
            box-sizing: border-box;
            .el-card__body {
                padding: 10px;
                .title {
                    font-size: 18px;
                    padding-left: 10px;
                }
                .calendarBox {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                }
                .week-bar {
                    border-bottom: 1px solid #ccc;
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                }
                .list {
                    text-align: center;
                    margin: 6px 0 0 8px;
                    width: 30px;
                    height: 20px;
                }
                .list-week {
                    height: 24px;
                    line-height: 24px;
                }
                .listDay {
                    height: 30px;
                    line-height: 30px;
                    color: #FF8D77;
                    cursor: pointer;
                    border-radius: 6px;
                    transition: all .3s;
                    font-weight: 500;
                    &.work {
                        color: #4B7EC1;
                    }
                    &.act,
                    &:hover {
                        background-color: #73A5E7;
                        color: #fff!important;
                    }
                }
            }
        }
    }
}
</style>
