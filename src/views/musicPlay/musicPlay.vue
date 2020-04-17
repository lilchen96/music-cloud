<template>
    <div class="container">
        <div class="top">
            <div class="back-btn icon-outer">
                <img class="icon" :src="backIcon" />
            </div>
            <div class="music-title">
                <div class="music-name">
                    {{ currentSongDetail.name }}
                </div>
                <div class="music-author">
                    <div>{{ currentSongDetail.artist }}</div>
                    <div class="icon-outer">
                        <img class="icon" :src="rightArrowIcon" />
                    </div>
                </div>
            </div>
            <div class="top-operations">
                <div class="operation-item icon-outer">
                    <img class="icon" :src="shareIcon" />
                </div>
            </div>
        </div>
        <div class="content">
            <div class="music-cover">
                <img
                    class="cover-image cover-image-animation"
                    :style="{ animationPlayState: animationPlayState }"
                    :src="currentSongDetail.coverUrl"
                />
            </div>
        </div>
        <div class="bottom">
            <div class="top-operations">
                <div class="icon-outer">
                    <img class="icon" :src="heartIcon" />
                </div>
                <!-- <div class="icon-outer">
                    <img class="icon" :src="rightArrowIcon" />
                </div>
                <div class="icon-outer">
                    <img class="icon" :src="rightArrowIcon" />
                </div> -->
            </div>
            <div class="progress-bar">
                <audio-player
                    ref="autioPlayer"
                    :musicUrl="currentSongUrl"
                    :autoPlay="autoPlay"
                    @on-audio-play="onAudioPlay"
                    @on-audio-pause="onAudioPause"
                    @on-audio-end="onAudioEnd"
                ></audio-player>
            </div>
            <div class="bottom-operations">
                <div class="icon-outer bottom-operations-item">
                    <img class="icon" :src="preSongIcon" @click="switchMusic('pre')" />
                </div>
                <div class="icon-outer bottom-operations-item">
                    <img class="icon action" :src="actionIcon" @click="musicAction" />
                </div>
                <div class="icon-outer bottom-operations-item">
                    <img class="icon" :src="nextSongIcon" @click="switchMusic('next')" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import backIcon from "@/assets/images/back_icon.png";
import rightArrowIcon from "@/assets/images/right_arrow_icon.png";
import shareIcon from "@/assets/images/share_icon.png";
import heartIcon from "@/assets/images/heart_icon.png";
import heartFillIcon from "@/assets/images/heart_fill_icon.png";
import playActionIcon from "@/assets/images/play_action_icon.png";
import pauseActionIcon from "@/assets/images/pause_action_icon.png";
import nextSongIcon from "@/assets/images/next_song_icon.png";
import preSongIcon from "@/assets/images/pre_song_icon.png";

import audioPlayer from "@/views/musicPlay/components/audioPlayer.vue";

export default {
    components: {
        audioPlayer
    },
    data() {
        return {
            backIcon,
            shareIcon,
            rightArrowIcon,
            heartIcon,
            heartFillIcon,
            nextSongIcon,
            preSongIcon,
            musicUrl: "https://music.163.com/song/media/outer/url?id=409736433.mp3", // 音乐url
            autoPlay: true,
            isPlay: true, // 音乐是否在播放
            animationPlayState: "paused", // 动画状态
            songIds: ["409736433", "29789328"], // 播放队列的音乐id
            songList: [],
            currentSongDetail: {
                id: "",
                name: "",
                artist: [],
                coverUrl: ""
            }
        };
    },

    mounted() {},
    created() {
        // 查询歌曲信息
        this.$axios({
            method: "get",
            url: "musicDetail",
            params: {
                ids: this.songIds.join(",")
            }
        })
            .then(res => {
                this.songList = res.data.songs.map(song => ({
                    id: song.id,
                    name: song.name,
                    artist: song.ar.map(it => it.name).join("/"),
                    coverUrl: song.al.picUrl
                }));
                this.musicUrl = "";
                this.currentSongDetail = this.songList[0];
            })
            .catch(() => {});
    },

    computed: {
        actionIcon() {
            return this.isPlay ? pauseActionIcon : playActionIcon;
        },

        currentSongUrl() {
            debugger;
            return `https://music.163.com/song/media/outer/url?id=${this.currentSongDetail.id}.mp3`;
        }
    },

    methods: {
        // 播放或暂停点击事件
        musicAction() {
            if (this.isPlay) {
                this.$refs.autioPlayer.audioPause();
            } else {
                this.$refs.autioPlayer.audioPlay();
            }
        },

        // 播放音乐时触发的回调函数
        onAudioPlay() {
            this.isPlay = true;
        },

        // 暂停音乐时触发的回调函数
        onAudioPause() {
            this.isPlay = false;
        },

        // 音乐播放结束触发的回调函数
        onAudioEnd() {
            // 如果是autoPlay isPlay过后会变成true 如果不是 那就是false
            this.switchMusic("next");
        },

        // 切换歌曲
        switchMusic(order) {
            let currentSongIndex = 0;
            if (order) {
                this.songList.forEach((item, index) => {
                    if (item.id === this.currentSongDetail.id) {
                        currentSongIndex = index;
                    }
                });
            }
            if (order === "next") {
                currentSongIndex += 1;
            } else {
                currentSongIndex -= 1;
            }
            if (this.autoPlay) {
                this.isPlay = true;
            } else {
                this.isPlay = false;
            }
            this.currentSongDetail = this.songList[currentSongIndex];
        }
    },

    watch: {
        isPlay: {
            handler() {
                if (this.isPlay) {
                    this.animationPlayState = "running";
                } else {
                    this.animationPlayState = "paused";
                }
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.container {
    background-color: transparent;
    background-image: url("../../assets/images/play_background.png");
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    padding: 0px 10px;
    .top {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        color: #fff;
        .back-btn {
        }
        .music-title {
            display: flex;
            flex-direction: column;
            text-align: center;
            .music-name {
                font-size: 18px;
            }
            .music-author {
                display: flex;
                height: 20px;
                .icon {
                    width: 13px;
                    height: 13px;
                }
            }
        }
        .top-operations {
            .operation-item {
            }
        }

        .icon {
            width: 28px;
            height: 28px;
        }
    }
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .music-cover {
            text-align: center;
            .cover-image {
                width: 230px;
                height: 230px;
                border-radius: 50%;
            }
            .cover-image-animation {
                animation: rotate 16s infinite linear;
                animation-fill-mode: forwards;
            }
        }
    }
    .bottom {
        height: 190px;
        .top-operations {
            display: flex;
            justify-content: center;
        }
        .progress-bar {
        }
        .bottom-operations {
            height: 50px;
            display: flex;
            justify-content: center;
            .bottom-operations-item:not(:last-child) {
                margin-right: 25px;
                .icon {
                    width: 30px;
                    height: 30px;
                }
                .action {
                    width: 55px;
                    height: 55px;
                }
            }
        }
        .icon {
            width: 28px;
            height: 28px;
        }
    }

    .icon-outer {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
