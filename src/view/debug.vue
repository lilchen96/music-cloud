<template>
  <div>
    <baseInput :inputOptions="inputOptions"></baseInput>
    <div>{{inputOptions.value}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputOptions: {
        value: '123',
        placeholder: '请输入',
        style: 'line'
      }
    }
  }
}
</script>

<style>
</style>