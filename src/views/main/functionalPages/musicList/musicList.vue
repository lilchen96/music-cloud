<template>
    <div class="music-list-section">
        <div class="background-image" :style="{ backgroundImage: 'url(' + playlistCover + ')' }"></div>
        <top-title class="top" title="歌单"></top-title>
        <div class="paly-list-info">
            <div class="cover">
                <img :src="playlistCover" />
            </div>
            <div class="info">
                <div class="name">{{ playlistName }}</div>
                <div class="creator">
                    <div class="avatar">
                        <img :src="creatorInfo.avatarUrl" />
                    </div>
                    <div class="user-name">{{ creatorInfo.nickname }}</div>
                    <div class="link">
                        <img :src="icons.rightArrowIcon" />
                    </div>
                </div>
                <div v-if="playlistDescription" class="desc">
                    <div class="text">{{ playlistDescription }}</div>
                    <div class="link">
                        <img :src="icons.rightArrowIcon" />
                    </div>
                </div>
            </div>
        </div>
        <music-play-list class="content" :musicList="musicList" @clickMusic="showMusicPlayer"></music-play-list>
    </div>
</template>

<script>
import musicPlayList from "@/components/musicPlayList/musicPlayList.vue";

import rightArrowIcon from "@/assets/images/right_arrow_icon.png";

export default {
    components: {
        musicPlayList
    },
    data() {
        return {
            icons: {
                rightArrowIcon
            },
            // 音乐播放列表
            musicList: [],
            // 歌单封面
            playlistCover: "",
            // 歌单名
            playlistName: "",
            // 歌单描述
            playlistDescription: "",
            // 创建者信息
            creatorInfo: {
                nickname: "",
                userId: "",
                avatarUrl: ""
            }
        };
    },

    mounted() {},

    async created() {
        const { playlistId } = this.$route.query;
        const accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
        if (playlistId === "weekRecord") {
            // 查询本周历史播放
            const res = await this.$axios({
                method: "get",
                url: "getUserRecord",
                params: {
                    uid: accountInfo.userId,
                    type: 1
                }
            });
            this.musicList = res.data.weekData.map(({ song: item }) => ({
                id: item.id,
                name: item.name,
                artistName: item.ar.map(it => it.name).join("/"),
                albumName: item.al.name
            }));
        } else {
            // 查询歌单歌曲信息
            const res = await this.$axios({
                method: "get",
                url: "getPlaylistDeatil",
                params: {
                    id: playlistId
                }
            });
            this.creatorInfo = {
                nickname: res.data.playlist.creator.nickname,
                userId: res.data.playlist.creator.userId,
                avatarUrl: res.data.playlist.creator.avatarUrl
            };
            this.playlistCover = res.data.playlist.coverImgUrl;
            this.playlistName = res.data.playlist.name;
            this.playlistDescription = res.data.playlist.description;
            this.musicList = res.data.playlist.tracks.map(item => ({
                id: item.id,
                name: item.name,
                artistName: item.ar.map(it => it.name).join("/"),
                albumName: item.al.name
            }));
        }
    },

    methods: {
        showMusicPlayer(ids) {
            this.$emit("showMusicPlayer", ids);
        }
    }
};
</script>

<style lang="less" scoped>
.music-list-section {
    height: 100%;
    display: flex;
    flex-direction: column;
    .top {
        z-index: 1;
    }
    .background-image {
        position: absolute;
        height: 50%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-filter: blur(20px);
        -moz-filter: blur(20px);
        -ms-filter: blur(20px);
        -o-filter: blur(20px);
        filter: blur(20px);
        opacity: 0.4;
    }
    .paly-list-info {
        padding: 20px 10px;
        display: flex;
        z-index: 0;
        .cover {
            img {
                width: 135px;
                height: 135px;
                border-radius: 8px;
            }
        }
        .info {
            margin-left: 20px;
            margin-top: 6px;
            .name {
                font-size: 19px;
                margin-bottom: 12px;
            }
            .creator {
                display: flex;
                margin-bottom: 12px;
                .avatar {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }
                }
                .user-name {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    opacity: 0.8;
                    margin-left: 8px;
                }
                .link {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    opacity: 0.8;
                    margin-left: 4px;
                    img {
                        width: 12px;
                        height: 12px;
                    }
                }
            }
            .desc {
                display: flex;
                .text {
                    opacity: 0.8;
                    font-size: 12px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .link {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    opacity: 0.8;
                    margin-left: 4px;
                    img {
                        width: 12px;
                        height: 12px;
                    }
                }
            }
        }
    }
    .content {
        z-index: 1;
        flex: 1;
        height: 100px;
    }
}
</style>
