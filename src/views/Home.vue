<template>
  <div class="home">
    <nav-menu></nav-menu>
    <index-contain></index-contain>
  </div>
</template>

<script>
import navMenu from '@/layout/Menu.vue';
import indexContain from '@/layout/Index.vue';

export default {
  name: 'home',
  components: {
    navMenu, indexContain
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
