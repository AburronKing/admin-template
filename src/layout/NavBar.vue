<template>
  <!-- 导航栏 -->
  <div class="nav-bar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user">
      <div class="bg-avatar"></div>
      欢迎，摆摊人
    </div>
  </div>
</template>

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
