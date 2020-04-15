<template>
  <div class="bottom-bar-section">
    <div v-for="item in bottomBarOptions.buttonList" class="link-item">
      <img class="icon" :src="item.url" />
      <div class="label">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bottomBarOptions: {
      type: Object,
      default: () => {
        return {
          buttonList: [
            {
              label: '发现',
              url: require('@/assets/images/discover_icon.png')
            },
            {
              label: '视频',
              url: require('@/assets/images/play_icon.png')
            },
            {
              label: '我的',
              url: require('@/assets/images/music_icon.png')
            },
            {
              label: '云村',
              url: require('@/assets/images/group_icon.png')
            },
            {
              label: '账号',
              url: require('@/assets/images/user_icon.png')
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bottom-bar-section {
  display: flex;
  justify-content: space-around;
  padding: 8px 0px;
  background-color: #2e2e2e;
  .link-item {
    text-align: center;
    .icon {
      width: 25px;
      height: 25px;
    }
    .label {
      font-size: 10px;
      color: #bfbfbf;
    }
  }
}
</style>