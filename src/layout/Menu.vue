<template>
  <div class="menu">
    <div v-if="!isCollapse" class="bg-menu_close" @click="isCollapse=true"></div>
    <div v-if="isCollapse" class="bg-menu_open" @click="isCollapse=false"></div>
    <div class="slogan">
      <div class="bg-menu_logo"></div>
      <span v-if="!isCollapse">组件Factory</span>
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
        <div v-for="item in routes" :key="item.path">
          <!-- 有子级 -->
          <el-submenu v-if="item.children" :index="item.id">
            <template slot="title">
              <i v-if="item.icon" :class="{[item.icon]: true}"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <div v-for="item2 in item.children" :key="item2.path">
              <el-submenu v-if="item2.children" :index="item2.id">
                <template slot="title">
                  <span slot="title">{{ item2.name }}</span>
                </template>
                <el-menu-item v-for="item3 in item2.children" :key="item3.path" :index="item3.id">
                  <span slot="title">{{ item3.name }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="item2.id">
                <span slot="title">{{ item2.name }}</span>
              </el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item v-else :index="item.id">
            <i v-if="item.icon" :class="{[item.icon]: true}"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
    
  </div>
</template>

<script>
import { actRoute } from '@/router/actRoute.js';
export default {
  data() {
    return {
      isCollapse: false,
      activeIndex: 1,
      routes: actRoute
    };
  },
  created() {
    this.activeIndex = this.$route.meta.id;
  },
  methods: {
    selectMenu(key, keyPath) {
      let path = this.findPath(key, this.routes);
      this.$router.push({
        path: path || '*'
      });
    },
    // 查找路径
    findPath(id, routes) {
      try {
        var filterRoute = routes.find(item => item.id === id)
        if(filterRoute) {
          return filterRoute.path
        } else { // 如果没有对应id  则去找它子级的path
          for(let i of routes) {
            if(i.children && i.children.length) {
               return this.findPath(id, i.children);
            }
          }
        }
      } catch (err) {
        console.log(err);
        return '*'
      }
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
