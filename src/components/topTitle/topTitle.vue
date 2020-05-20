<template>
    <div class="top-title">
        <div class="icon" @click="iconClick">
            <img :src="backIcon" />
        </div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
import backIcon from "@/assets/images/back_icon.png";

export default {
    props: {
        title: {
            type: String,
            default: "标题"
        }
    },
    data() {
        return {
            backIcon
        };
    },

    methods: {
        iconClick() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="less" scoped>
.top-title {
    width: calc(100% - 52px);
    height: 52px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    .icon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            width: 26px;
            height: 26px;
        }
    }
    .title {
        font-size: 19px;
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
