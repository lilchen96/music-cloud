<template>
    <div class="audio-play">
        <audio id="audio" :src="audioUrl" :autoplay="autoPlay" preload></audio>
        <div v-if="showProgress" class="progress">
            <div class="time left">{{ getAudioCurrentTime }}</div>
            <line-progress-bar
                class="progress-bar"
                ref="progress"
                :duration="audioDuration"
                :progress="audioCurrentTime"
            ></line-progress-bar>
            <div class="time right">{{ getAudioDuration }}</div>
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

    mounted() {
        const audio = document.querySelector("#audio");
        // 当audio缓冲足以播放时 获取音乐总时间audioDuration
        audio.oncanplay = () => {
            this.audioDuration = audio.duration;
        };
        // 当audio播放 开始刷新audioCurrentTime
        audio.onplaying = () => {
            this.timeUpdateStart();
            if (this.showProgress) {
                this.$refs.progress.run();
            }
            this.$emit("on-audio-play");
        };

        // 当audio开始加载且未实际加载任何数据前
        audio.onloadstart = () => {
            this.timeUpdateStop();
            if (this.showProgress) {
                this.$refs.progress.stop();
            }
        };

        // 当audio暂停时 清除interval
        audio.onpause = () => {
            this.timeUpdateStop();
            if (this.showProgress) {
                this.$refs.progress.stop();
            }
            this.$emit("on-audio-pause");
        };

        // 当audio播放完毕
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
        timeUpdateStart() {
            // 立即执行一次
            this.audioCurrentTime = document.querySelector("#audio").currentTime;
            this.audioUpdateInterval = setInterval(() => {
                const audio = document.querySelector("#audio");
                this.audioCurrentTime = audio.currentTime;
            }, 1000);
        },

        // 停止audio状态 1s间隔
        timeUpdateStop() {
            clearInterval(this.audioUpdateInterval);
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
            position: absolute;
            bottom: 144px;

            color: #464242;
            font-size: 10px;
        }
        .left {
            left: 12px;
        }
        .right {
            right: 12px;
        }
        .progress-bar {
            position: absolute;
            bottom: 150px;
            left: 27px;
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0px 12px;
        }
    }
}
</style>
