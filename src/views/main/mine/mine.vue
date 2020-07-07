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
                </div>
                <!-- 操作模块-->
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
            <!-- 操作模块-->
            <div class="mine-content" :class="!outerScroller ? 'overflow' : ''">
                <div class="functional-module">
                    <div class="top-title">我的音乐</div>
                    <music-module-list :list="musicModuleList"></music-module-list>
                </div>

                <div class="functional-module">
                    <top-tab-title :tabList="playlistTabList">
                        <play-list-show slot="tab1" :list="myPlaylists"></play-list-show>
                        <play-list-show slot="tab2" :list="subscribedlists"></play-list-show>
                    </top-tab-title>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import musicModuleList from "@/views/main/mine/components/musicModuleList.vue";
import playListShow from "@/views/main/mine/components/playListShow.vue";
import topTabTitle from "@/views/main/mine/components/topTabTitle.vue";

import cloudIcon from "@/assets/images/cloud_icon.png";
import myFavouriteIcon from "@/assets/images/my_favourite_icon.png";
import heartFillIcon from "@/assets/images/heart_fill_icon.png";
import historySacnFillIcon from "@/assets/images/history_sacn_fill_icon.png";
import mineCover1 from "@/assets/images/mine_cover1.png";
import mineCover2 from "@/assets/images/mine_cover2.png";

export default {
    components: {
        musicModuleList,
        playListShow,
        topTabTitle
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
                    id: "myLike",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐",
                    coverImage: mineCover1,
                    link: "musicList",
                    query: {
                        playlistId: ""
                    }
                },
                {
                    id: "weekRecord",
                    icon: historySacnFillIcon,
                    name: "最近播放",
                    description: "最近爱听的歌",
                    coverImage: mineCover2,
                    link: "musicList",
                    query: {
                        playlistId: "weekRecord"
                    }
                },
                {
                    id: "1",
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                },
                {
                    id: "2",
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                },
                {
                    id: "3",
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                }
            ],

            playlistTabList: [
                {
                    id: "tab1",
                    name: "创建歌单",
                    count: ""
                },
                {
                    id: "tab2",
                    name: "收藏歌单",
                    count: ""
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
        registerScrollEvent() {},

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
            this.musicModuleList.find(item => item.id === "myLike").query.playlistId = res.data.playlist[0].id;
            const myPlaylists = res.data.playlist.filter(item => !item.subscribed && item.specialType !== 5);
            const subscribedlists = res.data.playlist.filter(item => item.subscribed);
            this.myPlaylists = myPlaylists.map(item => ({
                id: item.id,
                coverUrl: item.coverImgUrl,
                name: item.name,
                count: item.trackCount
            }));
            this.subscribedlists = subscribedlists.map(item => ({
                id: item.id,
                coverUrl: item.coverImgUrl,
                name: item.name,
                count: item.trackCount
            }));
            this.playlistTabList[0].count = this.myPlaylists.length;
            this.playlistTabList[1].count = this.subscribedlists.length;
        }
    }
};
</script>

<style lang="less" scoped>
.mine-section {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
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
        height: 52px;
        position: relative;
        .icon {
            padding: 10px 0px 6px 18px;
        }
    }
    .section {
        flex: 1;
        position: relative;
        height: 100%;
        overflow-x: hidden;
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
            .functional-module:not(:last-child) {
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
