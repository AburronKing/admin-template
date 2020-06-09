<template>
  <!-- 页面主内容区 -->
  <div class="main-contain">
    <nav-bar></nav-bar>
    <div class="contain">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navBar from '@/layout/NavBar.vue';
export default {
  components: {
    navBar
  }
};
</script>

<style lang="scss">
.main-contain {
  flex: 1;
  padding: 0 24px 28px;
  background:rgba(242,245,250,1);
  .contain {
    box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
    background-color: #fff;
    width: 100%;
    height: calc(100% - 48px);
    border-radius: 4px;
  }
}
</style>
