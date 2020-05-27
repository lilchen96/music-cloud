<template>
    <div class="bottom-bar-section">
        <div v-for="item in bottomBarOptions.buttonList" :key="item.url" @click="item.onClick" class="link-item">
            <img class="icon" :src="item.url" />
            <div class="label">{{ item.label }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 底部菜单选项
        bottomBarOptions: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style lang="less" scoped>
.bottom-bar-section {
    height: 58px;
    display: flex;
    justify-content: space-around;
    background-color: #2e2e2e;
    .link-item {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .icon {
            width: 25px;
            height: 25px;
        }
        .label {
            margin-top: 4 px;
            font-size: 10px;
            color: #bfbfbf;
        }
    }
}
</style>
