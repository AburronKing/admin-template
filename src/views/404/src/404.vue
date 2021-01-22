<template>
  <div class="page404">
    404
  </div>
</template>
<script>
export default {
  name: '404',
  created() {
    this.$message.error('找不到页面了~')
  }
};
</script>

<style lang="scss">
  .page404 {
    font-size: 400px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
</style>
