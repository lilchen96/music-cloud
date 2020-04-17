<template>
    <div class="audio-play">
        <audio id="audio" :src="audioUrl" :autoplay="autoPlay" preload></audio>
        <div v-if="showProgress" class="progress">
            <div class="time">{{ getAudioCurrentTime }}</div>
            <line-progress-bar class="progress-bar" ref="progress" :duration="audioDuration + 's'"></line-progress-bar>
            <div class="time">{{ getAudioDuration }}</div>
        </div>
    </div>
</template>

<script>
import lineProgressBar from "@/components/musicPlayer/lineProgressBar.vue";

export default {
    components: {
        lineProgressBar
    },
    props: {
        // audio文件url
        audioUrl: {
            type: String,
            default: ""
        },
        // 是否自动播放
        autoPlay: {
            type: Boolean,
            default: false
        },
        // 是否展示进度条
        showProgress: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            audioDuration: 0, // audio总时间 s
            audioCurrentTime: 0, // audio已播放时间  s
            audioUpdateInterval: {}
        };
    },

    computed: {
        getAudioDuration() {
            return this.formatTime(this.audioDuration);
        },
        getAudioCurrentTime() {
            return this.formatTime(this.audioCurrentTime);
        }
    },

    watch: {
        audioCurrentTime: {
            handler() {
                if (this.audioCurrentTime === 0) {
                    this.$refs.progress.progressReset();
                }
            }
        }
    },

    mounted() {
        const audio = document.querySelector("#audio");
        // 当audio缓冲足以播放时 获取音乐总时间audioDuration
        audio.oncanplay = () => {
            this.audioDuration = audio.duration;
        };
        // 当audio播放 开始刷新audioCurrentTime
        audio.onplay = () => {
            this.audioUpdate();
            this.$refs.progress.progressPlay();
            this.$emit("on-audio-play");
        };
        // 当audio暂停时 清除interval
        audio.onpause = () => {
            clearInterval(this.audioUpdateInterval);
            this.$refs.progress.progressPause();
            this.$emit("on-audio-pause");
        };
        audio.onended = () => {
            this.$emit("on-audio-end");
        };
    },

    methods: {
        audioPlay() {
            const audio = document.querySelector("#audio");
            audio.play();
        },
        audioPause() {
            const audio = document.querySelector("#audio");
            audio.pause();
        },

        // 更新audio状态 1s间隔
        audioUpdate() {
            this.audioUpdateInterval = setInterval(() => {
                const audio = document.querySelector("#audio");
                this.audioCurrentTime = audio.currentTime;
            }, 1000);
        },

        // 格式化秒数
        formatTime(data) {
            const hourPart = parseInt(data / (60 * 60), 10);
            const minPart = parseInt((data % (60 * 60)) / 60, 10);
            const secPart = parseInt((data % (60 * 60)) % 60, 10);
            const timeArr = [hourPart, minPart, secPart < 10 ? `0${secPart}` : secPart];
            if (!timeArr[0]) {
                timeArr.splice(0, 1);
            }
            return timeArr.join(":");
        }
    }
};
</script>

<style lang="less" scoped>
.audio-play {
    .progress {
        display: flex;
        justify-content: center;
        .time {
            color: #8a8a8a;
            font-size: 10px;
        }
        .progress-bar {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0px 12px;
        }
    }
}
</style>
