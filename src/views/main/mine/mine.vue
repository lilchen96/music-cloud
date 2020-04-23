<template>
    <div class="mine-section">
        <div class="background-image" :style="{ backgroundImage: 'url(' + backgroundUrl + ')' }"></div>
        <div class="top-left">
            <img class="icon" :src="icons.cloudIcon" />
        </div>
        <div class="section" :class="outerScroller ? 'overflow' : ''">
            <div v-if="outerScroller" class="mine-top">
                <div class="info">
                    <div class="left">
                        <div class="avatar">
                            <img class="image" :src="avatarUrl" />
                        </div>
                        <div class="name">{{ nickname }}</div>
                    </div>
                    <!-- <div class="right"></div> -->
                </div>
                <div class="operation">
                    <div class="operation-item">
                        <img class="icon" :src="icons.myFavouriteIcon" />
                        <div class="name">本地音乐</div>
                    </div>
                    <div class="operation-item">
                        <img class="icon" :src="icons.myFavouriteIcon" />
                        <div class="name">我的电台</div>
                    </div>
                    <div class="operation-item">
                        <img class="icon" :src="icons.myFavouriteIcon" />
                        <div class="name">本地音乐</div>
                    </div>
                    <div class="operation-item">
                        <img class="icon" :src="icons.myFavouriteIcon" />
                        <div class="name">本地音乐</div>
                    </div>
                </div>
            </div>
            <div class="mine-content" :class="!outerScroller ? 'overflow' : ''">
                <div class="functional-module">
                    <div class="top-title">我的音乐</div>
                    <music-module-list :list="musicModuleList"></music-module-list>
                </div>

                <div class="functional-module">
                    <div class="top-title">创建歌单</div>
                    <paly-list-show :list="myPlaylists"></paly-list-show>
                </div>

                <div class="functional-module">
                    <div class="top-title">收藏歌单</div>
                    <paly-list-show :list="subscribedlists"></paly-list-show>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import musicModuleList from "@/views/main/mine/components/musicModuleList.vue";
import palyListShow from "@/views/main/mine/components/palyListShow.vue";

import cloudIcon from "@/assets/images/cloud_icon.png";
import myFavouriteIcon from "@/assets/images/my_favourite_icon.png";
import heartFillIcon from "@/assets/images/heart_fill_icon.png";

export default {
    components: {
        musicModuleList,
        palyListShow
    },

    data() {
        return {
            icons: {
                cloudIcon,
                myFavouriteIcon
            },
            userId: "",
            avatarUrl: "",
            nickname: "",
            backgroundUrl: "",
            outerScroller: true, // 外滚动和内滚动
            // 我的音乐模块功能块
            musicModuleList: [
                {
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                },
                {
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                },
                {
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                },
                {
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                },
                {
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                }
            ],
            //  创建歌单
            myPlaylists: [],

            // 收藏歌单
            subscribedlists: []
        };
    },

    created() {
        this.initAccountInfo();
        this.getPlaylist();
    },

    mounted() {
        this.registerScrollEvent();
    },

    methods: {
        registerScrollEvent() {
            const topHeight = document.querySelector(".mine-top").offsetHeight;
            const outer = document.querySelector(".section");
            const inner = document.querySelector(".mine-content");

            // outer.onscroll = () => {
            //     if (outer.scrollTop - 10 >= topHeight) {
            //         this.outerScroller = false;
            //         outer.scrollTop = topHeight;
            //         // outer.style.position = "fixed";
            //     }
            // };

            // inner.onscroll = () => {
            //     if (inner.scrollTop <= 0) {
            //         this.outerScroller = true;
            //     }
            // };
        },

        // 初始化用户信息
        initAccountInfo() {
            const accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
            this.userId = accountInfo.userId;
            this.nickname = accountInfo.nickname;
            this.avatarUrl = accountInfo.avatarUrl;
            this.backgroundUrl = accountInfo.backgroundUrl;
        },

        // 获取用户歌单
        async getPlaylist() {
            const res = await this.$axios({
                method: "get",
                url: "getPlaylist",
                params: {
                    uid: this.userId
                }
            });
            const myPlaylists = res.data.playlist.filter(item => !item.subscribed && item.specialType !== 5);
            const subscribedlists = res.data.playlist.filter(item => item.subscribed);
            this.myPlaylists = myPlaylists.map(item => ({
                coverUrl: item.coverImgUrl,
                name: item.name,
                count: item.trackCount
            }));
            this.subscribedlists = subscribedlists.map(item => ({
                coverUrl: item.coverImgUrl,
                name: item.name,
                count: item.trackCount
            }));
        }
    }
};
</script>

<style lang="less" scoped>
.mine-section {
    height: 100%;
    display: flex;
    flex-direction: column;
    .background-image {
        position: absolute;
        top: -25px;
        height: 30%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 0.4;
    }
    .top-left {
        position: relative;
        padding: 10px 0px 6px 18px;
        .icon {
        }
    }
    .section {
        flex: 1;
        position: relative;
        height: 100%;
        .mine-top {
            padding: 10px 18px;
            .info {
                display: flex;
                justify-content: space-between;
                padding: 16px 0px 30px 0px;
                .left {
                    display: flex;
                    .avatar {
                        .image {
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                        }
                    }
                    .name {
                        font-size: 16px;
                        padding: 6px 8px;
                    }
                }
                .right {
                }
            }
            .operation {
                display: flex;
                justify-content: space-between;
                text-align: center;
                .operation-item {
                    .icon {
                        width: 28px;
                        height: 28px;
                    }
                    .name {
                        margin-top: 4px;
                        font-size: 13px;
                    }
                }
            }
        }
        .mine-content {
            background-color: #1c1c1c;
            border-radius: 22px;
            padding: 16px 16px;
            .functional-module {
                margin-bottom: 26px;
                .top-title {
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                .my-music {
                    display: flex;
                    justify-content: space-between;
                }
                .play-list {
                    height: 500px;
                }
            }
        }
    }
    .overflow {
        overflow-y: auto;
    }
}
</style>
