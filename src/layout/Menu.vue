<template>
  <div class="menu">
    <div v-if="!isCollapse" class="bg-menu_close" @click="isCollapse=true"></div>
    <div v-if="isCollapse" class="bg-menu_open" @click="isCollapse=false"></div>
    <div class="slogan">
      <div class="bg-menu_logo"></div>
      <span v-if="!isCollapse">这里是系统名称</span>
    </div>
    <div class="xn-menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-reset"
        text-color="#fff"
        active-text-color="#59C4FD"
        :unique-opened="true"
        :collapse="isCollapse"
        @select="selectMenu"
      >
        <div v-for="item in routers" :key="item.path">
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i v-if="item.icon" :class="{[item.icon]: true}"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <div v-for="item2 in item.children" :key="item2.path">
              <el-submenu v-if="item2.children" :index="item2.index">
                <template slot="title">
                  <span slot="title">{{ item2.name }}</span>
                </template>
                <el-menu-item v-for="item3 in item2.children" :key="item3.path" :index="item3.index">
                  <span slot="title">{{ item3.name }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="item2.index">
                <span slot="title">{{ item2.name }}</span>
              </el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item v-else :index="item.index">
            <i v-if="item.icon" :class="{[item.icon]: true}"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
    
  </div>
</template>

<script>
import { menu } from '@/main.js';
export default {
  data() {
    return {
      isCollapse: false,
      routers: [],
      activeIndex: 1
    };
  },
  created() {
    this.routers = menu;
    this.activeIndex = this.$route.meta.index;
  },
  methods: {
    selectMenu(key, keyPath) {
      const len = keyPath.length;
      let path = '';
      for (const i of this.routers) {
        if (i.index === keyPath[0]) {
          path = i.path;
          if (len > 1) {
            const secondMenu = i.children.find(item => item.index === keyPath[1]);
            path = secondMenu.path;
            if (len > 2) {
              for (const j of secondMenu.children) {
                if (j.index === keyPath[2]) {
                  path = j.path;
                }
                
              }
            }
          }
        }
      }
      this.$router.push({
        path: path
      });
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
.menu {
  height: 100%;
  background: url('~@/assets/img/menu-bg.png');
  background-position: left bottom;
  .slogan {
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
  .xn-menu {
    height: calc(100% - 68px);
    padding-bottom: 30px;
    overflow: hidden;
  }
  .el-menu-reset {
    width: 263px;
    height: 100%;
    border-right: none;
    margin-right: -15px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-menu {
    background-color: transparent;
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
    height: 40px;
    line-height: 40px;
    padding-left: 26px !important;
  }
  
  .el-submenu {
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
      padding-left: 26px !important;
      i {
        color: #fff;
      }
    }
    .el-menu-item {
      padding: 0 20px 0 65px !important;
      height: 44px;
      line-height: 44px;
    }
    .el-submenu__icon-arrow {
      left: 220px;
      right: unset;
    }
  }
  .el-menu--collapse {
    margin-right: 0;
    width: 64px;
  }
  .el-menu--collapse .el-menu-item .el-submenu__icon-arrow, .el-menu--collapse .el-submenu>.el-submenu__title .el-submenu__icon-arrow, .el-menu--collapse .el-menu-item span, .el-menu--collapse .el-submenu>.el-submenu__title span {
    display: none;
  }
}
.el-submenu .el-submenu {
  .el-submenu__title {
    padding: 0 10px 0 65px !important;
  }
  .el-menu-item {
    padding: 0 10px 0 85px !important;
  }
}

.el-tooltip {
  padding-left: 26px !important;
}
.el-menu--popup {
  background: url('~@/assets/img/menu-bg.png');
  .el-menu-item:hover, .el-submenu .el-submenu__title:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .el-menu-item, .el-submenu__title {
    height: 42px;
    line-height: 42px;
  }
}
</style>
