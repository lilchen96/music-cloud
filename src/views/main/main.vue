<template>
  <div class="container">
    <div class="top"></div>
    <div class="router">
      <router-view></router-view>
    </div>
    <div class="bottom">
      <bottom-bar></bottom-bar>
    </div>
  </div>
</template>

<script>
import bottomBar from '@/views/main/components/bottomBar.vue'
export default {
  components: {
    bottomBar
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  .top {
    height: 30px;
  }
  .router {
    flex: 1;
  }
  .bottom {
  }
}
</style>