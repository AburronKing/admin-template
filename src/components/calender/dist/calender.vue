<!-- 全年日历 -->
<template lang="html">
  <div class="calenderYear" v-loading="loading">
    <div class="top">
      <div class="select-year">
        选择年份：
        <c-date-picker
          v-model="yearDate"
          value-format="yyyy"
          type="year"
          @change="selectYear"
          style="width:120px"
          :clearable="false"
          :editable="false"
          placeholder="选择年">
        </c-date-picker>
      </div>
      <div style="opacity: 0;">{{selectDayArr.length}}</div>
      <div class="btns">
        <slot></slot>
      </div>
    </div>
    <div class="scrollBox">
      <c-scrollbar tag="div"
      class="is-empty scroll-tree">
        <div class="allday">
          <c-card shadow="hover" class="month-card" v-for="(item,index) in allYear" :key="index" >
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
          </c-card>
        </div>
      </c-scrollbar>
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
      dayArr: [],
      selectDayArr: [],
      loading: true
    }
  },
  watch: {
    dayArrProp(n) {
      if(n && n.length) {
        this.dayArr = n;
        for (const i of n) {
          i.act = false
          delete i.id
        }
        this.selectDayArr = [];
        this.getMonthDays();
      } else {
        alert('日期获取失败')
      }
    }
  },
  methods: {
    getMonthDays() { // 本月有多少天
      this.allYear = []
      const yearTime = new Date(`${this.year}/01/01 00:00:00`).getTime()
      const arr = [] // 暂存计算后的当年所有天数

      for (let j = 0; j < new Date(`${this.year + 1}/01/01 00:00:00`) - new Date(`${this.year}/01/01 00:00:00`); j += 86400000) {
        const includeFlag = true
        const dateTime = yearTime + j
        for (let k = 0; k < this.dayArr.length; k++) {
          if (dateTime === this.dayArr[k].date) {
            arr.push(this.dayArr[k])
            break
          } else {
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
      this.getFirstDayOfWeek()
      this.loading = false
    },
    selectYear(year) {
      this.year = parseInt(year);
      this.$emit('getCalendar', this.year);
    },
    getFirstDayOfWeek() {
      const y = this.allYear
      this.$nextTick(() => {
        for (let i = 0; i < 12; i++) {
          document.getElementsByClassName('month-card')[i].getElementsByClassName('listDay')[0].style.marginLeft = y[i].weekOfFirstDay == 0 ? '10px' : (y[i].weekOfFirstDay * 40 + 10) + 'px';
        }
      })
    },
    // 获取所有选中的日期
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
    min-width: 1000px;
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
        justify-content: center;
        flex-wrap: wrap;
        margin-left: -14px;
        font-size: 14px;
        margin-top: 10px;
        .month-card {
            width: 320px;
            height: 290px;
            margin: 0 0 10px 10px;
            box-sizing: border-box;
            .el-card__body {
                padding: 10px 14px;
                .title {
                    font-size: 18px;
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
                    margin: 6px 0 0 10px;
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
