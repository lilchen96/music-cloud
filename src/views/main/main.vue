<template>
    <div class="container">
        <music-player
            style="z-index: 1;"
            :isFullScreen="isFullScreen"
            :newSongIds="newSongIds"
            @changeIsFullScreen="changeIsFullScreen"
        ></music-player>
        <div class="fullScreen" v-if="!isFullScreen">
            <div class="router">
                <transition :name="transitionName">
                    <router-view @showMusicPlayer="showMusicPlayer"></router-view>
                </transition>
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
            transitionName: "", // 路由跳转动画名称
            isFullScreen: false, //  播放器是否全屏
            newSongIds: [], // 新加入的歌曲
            bottomBarOptions: {
                buttonList: [
                    {
                        label: "发现",
                        url: discoverIcon,
                        onClick: () => {
                            this.$router.push({
                                name: "discovery"
                            });
                        }
                    },
                    {
                        label: "视频",
                        url: playIcon,
                        onClick: () => {
                            this.$router.push({
                                name: ""
                            });
                        }
                    },
                    {
                        label: "我的",
                        url: musicIcon,
                        onClick: () => {
                            this.$router.push({
                                name: "mine"
                            });
                        }
                    },
                    {
                        label: "云村",
                        url: groupIcon,
                        onClick: () => {
                            this.$router.push({
                                name: ""
                            });
                        }
                    },
                    {
                        label: "账号",
                        url: userIcon,
                        onClick: () => {
                            this.$router.push({
                                name: ""
                            });
                        }
                    }
                ]
            }
        };
    },

    methods: {
        // 播放器缩放
        changeIsFullScreen(val) {
            this.isFullScreen = val;
        },

        // 播放弹出播放器
        showMusicPlayer(ids) {
            // 传入播放音乐
            this.newSongIds = ids;
        }
    },

    // 监听路由变化
    watch: {
        $route(to, from) {
            if (to.meta.deepth >= from.meta.deepth) {
                this.transitionName = "slide-left";
            }
            if (to.meta.deepth < from.meta.deepth) {
                this.transitionName = "slide-right";
            }
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    color: #fff;
    .fullScreen {
        height: 100%;
        display: flex;
        flex-direction: column;
        .router {
            height: 100px;
            flex: 1;
        }
        .bottom {
        }
    }
}
.slide-left-enter {
    transform: translate(100%, 0);
}
.slide-left-enter-to {
    transform: translate(0, 0);
}
.slide-left-enter-active {
    transition: all 350ms;
}
.slide-right-enter {
    transform: translate(-100%, 0);
}
.slide-right-enter-to {
    transform: translate(0, 0);
}
.slide-right-enter-active {
    transition: all 350ms;
}
</style>
