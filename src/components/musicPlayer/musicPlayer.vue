<template>
    <div class="music-player">
        <audio-player
            ref="autioPlayer"
            :audioUrl="currentSongUrl"
            :autoPlay="autoPlay"
            :showProgress="isFullScreen"
            @on-audio-play="onAudioPlay"
            @on-audio-pause="onAudioPause"
            @on-audio-end="onAudioEnd"
        ></audio-player>
        <transition name="mini" mode="out-in">
            <div class="mini" v-if="!isFullScreen">
                <img
                    class="cover-image cover-image-animation"
                    :style="{ animationPlayState: animationPlayState }"
                    :src="currentSongDetail.coverUrl"
                    @click="changeIsFullScreen"
                />
            </div>
        </transition>
        <transition name="full-screen" mode="out-in">
            <div class="full-screen" v-if="isFullScreen">
                <div class="top">
                    <div class="back-btn icon-outer">
                        <img class="icon" :src="backIcon" @click="changeIsFullScreen" />
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
                    <div class="progress-bar"></div>
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
        </transition>
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

import audioPlayer from "@/components/musicPlayer/audioPlayer";

export default {
    components: {
        audioPlayer
    },
    props: {
        // 是否全屏
        isFullScreen: {
            type: Boolean,
            default: false
        }
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
            animationName: "full", // 缩放 动画名称
            autoPlay: false,
            isPlay: false, // 音乐是否在播放
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
                this.currentSongDetail = this.songList[0];
            })
            .catch(() => {});
    },

    computed: {
        actionIcon() {
            return this.isPlay ? pauseActionIcon : playActionIcon;
        },

        currentSongUrl() {
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
            this.autoPlay = true;
            this.isPlay = true;
        },

        // 暂停音乐时触发的回调函数
        onAudioPause() {
            this.isPlay = false;
        },

        // 音乐播放结束触发的回调函数
        onAudioEnd() {
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
                // next播放到最后一首了
                if (currentSongIndex === this.songList.length - 1) {
                    currentSongIndex = 0;
                } else {
                    currentSongIndex += 1;
                }
            } else {
                // pre播放到第一首了
                if (currentSongIndex === 0) {
                    currentSongIndex = this.songList.length - 1;
                } else {
                    currentSongIndex -= 1;
                }
            }
            if (this.autoPlay) {
                this.isPlay = true;
            } else {
                this.isPlay = false;
            }
            this.currentSongDetail = this.songList[currentSongIndex];
        },

        // 缩放与展示播放器
        changeIsFullScreen() {
            this.$emit("changeIsFullScreen", !this.isFullScreen);
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
// 封面旋转动画
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

// 封面旋转
.cover-image-animation {
    animation: rotate 16s infinite linear forwards;
}

// 组件缩放动画
.full-screen-leave,
.full-screen-enter-to {
    opacity: 1;
}
.full-screen-leave-to,
.full-screen-enter {
    opacity: 0;
}
.full-screen-leave-active,
.mini-leave-active {
    transition: all 500ms;
}
.mini-enter,
.mini-leave-to {
    opacity: 0;
    transform: translate(-200px, 300px);
}
.mini-enter-to,
.mini-leave {
    opacity: 1;
}
.mini-enter-active,
.full-screen-enter-active {
    transition: all 500ms;
}

.music-player {
    height: 100%;

    // 缩小样式
    .mini {
        position: absolute;
        right: 10px;
        top: 10px;
        .cover-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    // 全屏样式
    .full-screen {
        height: 100%;
        background-color: transparent;
        background-image: url("../../assets/images/play_background.png");
        background-repeat: no-repeat;
        background-size: cover;
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
                margin-top: 55px;
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
}
</style>
