<template>
    <div class="top-title">
        <div class="icon" @click="iconClick">
            <img :src="backIcon" />
        </div>
        <div class="title">{{ title }}</div>
        <div class="empty"></div>
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
    width: 100%;
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 19px;
    }
    .empty {
        width: 52px;
    }
}
</style>
