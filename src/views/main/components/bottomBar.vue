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
        bottomBarOptions: {
            type: Object,
            default: () => ({})
        }
    }
};
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
