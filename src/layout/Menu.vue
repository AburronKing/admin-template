<template>
  <div class="menu">
    <div v-if="!isCollapse" class="bg-menu_close" @click="isCollapse=true"></div>
    <div v-if="isCollapse" class="bg-menu_open" @click="isCollapse=false"></div>
    
    <el-menu
      default-active="1"
      class="xn-menu"
      text-color="#fff"
      active-text-color="#59C4FD"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <div class="slogan">
        <div class="bg-menu_logo"></div>
        <span>效能评价子系统</span>
      </div>
      <el-menu-item index="1">
        <i class="bg-menu_icon_zbwh"></i>
        <span slot="title">指标维护</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="bg-menu_icon_pgzx"></i>
        <span slot="title">评估执行</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="bg-menu_icon_cxtj"></i>
          <span>查询统计</span>
        </template>
        <el-menu-item index="3-1">指标模板查询</el-menu-item>
        <el-menu-item index="3-2">评估任务查询</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="bg-menu_icon_pgcx"></i>
          <span>评估查询</span>
        </template>
        <el-menu-item index="4-1">采集公司评估</el-menu-item>
        <el-submenu index="4-2">
          <template slot="title">
            <i class="bg-menu_icon_cxtj"></i>
            <span>坐席人员评估</span>
          </template>
          <el-menu-item index="4-2-1">坐席人员评估表</el-menu-item>
          <el-menu-item index="4-2-2">坐席评估汇总表</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="bg-menu_icon_cxtj"></i>
          <span>报表查询</span>
        </template>
        <el-menu-item index="5-1">指标模板查询</el-menu-item>
        <el-menu-item index="5-2">评估任务查询</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
 height: 100%;
 position: relative;
 .bg-menu_open {
    width: 13px; height: 11px;
    background: url('~@/assets/img/css_sprites.png') -26px -60px;
    position: absolute;
    top: 19px;
    right: -38px;
  }
  .bg-menu_close {
    width: 13px; height: 11px;
    background: url('~@/assets/img/css_sprites.png') -47px -60px;
    position: absolute;
    top: 19px;
    right: -38px;
  }
}
</style>

<style lang="scss">
.el-menu {
  width: 248px;
  height: 100%;
  background: url('~@/assets/img/menu-bg.png');
  background-color: transparent;
  background-position: left bottom;
  .slogan {
    width: 248px;
    height: 68px;
    color: #fff;
    font-size: 16px;
    line-height: 68px;
    .bg-menu_logo {
      width: 26px; height: 26px;
      background: url('~@/assets/img/css_sprites.png') -4px -4px;
      display: inline-block;
      vertical-align: middle;
      margin: 0 10px 0 21px;
    }
  }
  i {
    display: inline-block;
    margin-right: 8px;
  }
  .bg-menu_icon_zbwh {
    width: 14px; height: 14px;
    background: url('~@/assets/img/css_sprites.png') -66px -27px;
  }
  .bg-menu_icon_pgzx {
    width: 15px; height: 14px;
    background: url('~@/assets/img/css_sprites.png') -4px -38px;
  }
  .bg-menu_icon_pgcx {
    width: 14px; height: 14px;
    background: url('~@/assets/img/css_sprites.png') -27px -38px;
  }
  .bg-menu_icon_bbcx {
    width: 14px; height: 15px;
    background: url('~@/assets/img/css_sprites.png') -66px -4px;
  }
  .bg-menu_icon_cxtj {
    width: 14px; height: 14px;
    background: url('~@/assets/img/css_sprites.png') -4px -60px;
  }
  .el-menu-item.is-active, .el-menu-item:hover, .el-submenu .el-submenu__title:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .el-menu-item.is-active {
    border-left: 3px solid #fff;
  }
  .el-menu-item {
    width: 248px;
    padding-left: 30px !important;
  }
  .el-submenu__title {
    padding-left: 30px !important;
  }
  &.el-menu--collapse {
    width: 60px;
    .el-menu-item {
      width: 60px;
      padding-left: 20px !important;
    }
    .el-submenu__title {
      padding-left: 20px !important;
    }
    .slogan {
      width: 60px;
      .bg-menu_logo {
        margin-left: 16px;
      }
      span {
        display: none;
      }
    }
  }
}
</style>
