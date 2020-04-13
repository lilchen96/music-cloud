<template>
  <router-view></router-view>
</template>

<script>
export default {
  components: {},
  created() {
    this.$axios({
      method: 'post',
      url: 'getData',
      data: {}
    })
  }
}
</script>

<style>
</style>
