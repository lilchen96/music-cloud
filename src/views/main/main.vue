<template>
    <div class="container">
        <music-player :isFullScreen="isFullScreen" @changeIsFullScreen="changeIsFullScreen"></music-player>
        <div class="fullScreen" v-if="!isFullScreen">
            <div class="top"></div>
            <div class="router">
                <router-view></router-view>
            </div>
            <div class="bottom">
                <bottom-bar :bottomBarOptions="bottomBarOptions"></bottom-bar>
            </div>
        </div>
    </div>
</template>

<script>
import musicPlayer from "@/components/musicPlayer";
import bottomBar from "@/views/main/components/bottomBar.vue";

import discoverIcon from "@/assets/images/discover_icon.png";
import playIcon from "@/assets/images/play_icon.png";
import musicIcon from "@/assets/images/music_icon.png";
import groupIcon from "@/assets/images/group_icon.png";
import userIcon from "@/assets/images/user_icon.png";

export default {
    components: {
        musicPlayer,
        bottomBar
    },

    data() {
        return {
            isFullScreen: false, //  播放器是否全屏
            bottomBarOptions: {
                buttonList: [
                    {
                        label: "发现",
                        url: discoverIcon,
                        onClick: () => {
                            this.$router.push({
                                name: "musicPlay"
                            });
                        }
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
            }
        };
    },

    methods: {
        // 播放器缩放
        changeIsFullScreen(val) {
            debugger;
            this.isFullScreen = val;
        }
    },
    watch: {
        isFullScreen() {
            debugger;
            this.isFullScreen;
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    .fullScreen {
        height: 100%;
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
}
</style>
