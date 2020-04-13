<template>
  <button @click="onClick">{{btnOptions.name}}</button>
</template>

<script>
export default {
  props: {
    btnOptions: {
      type: Object,
      default: () => {
        return {
          name: '按钮',
          type: 'default',
          size: 'normal',
          color: 'red'
        }
      }
    }
  },

  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style>
</style>