<template>
  <!-- 导航栏 -->
  <div class="nav-bar">
    {{ breadcrumb }}
    <div class="user">
      <div class="bg-avatar"></div>
      欢迎，admin
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumb: ''
    };
  },
  watch: {
    '$route'(n) {
      this.breadcrumb = n.meta.breadcrumb;
    }
  },
  created() {
    this.breadcrumb = this.$route.meta.breadcrumb;
  }
};
</script>

<style lang="scss">
.nav-bar {
  padding-left: 40px;
  height: 48px;
  line-height: 48px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  .el-breadcrumb {
    height: 48px;
    line-height: 48px;
    font-size: 12px;
  }
  .bg-avatar {
    width: 20px; height: 20px;
    background: url('~@/assets/img/css_sprites.png') -38px -4px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
  }
}
</style>
