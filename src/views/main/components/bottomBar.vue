<template>
    <div class="bottom-bar-section">
        <div v-for="item in bottomBarOptions.buttonList" :key="item.url" class="link-item">
            <img class="icon" :src="item.url" />
            <div class="label">{{ item.label }}</div>
        </div>
    </div>
</template>

<script>
import discoverIcon from "@/assets/images/discover_icon.png";
import playIcon from "@/assets/images/play_icon.png";
import musicIcon from "@/assets/images/music_icon.png";
import groupIcon from "@/assets/images/group_icon.png";
import userIcon from "@/assets/images/user_icon.png";

export default {
    props: {
        bottomBarOptions: {
            type: Object,
            default: () => ({
                buttonList: [
                    {
                        label: "发现",
                        url: discoverIcon
                    },
                    {
                        label: "视频",
                        url: playIcon
                    },
                    {
                        label: "我的",
                        url: musicIcon
                    },
                    {
                        label: "云村",
                        url: groupIcon
                    },
                    {
                        label: "账号",
                        url: userIcon
                    }
                ]
            })
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
