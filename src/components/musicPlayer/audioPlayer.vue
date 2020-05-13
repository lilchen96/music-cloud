<template>
    <div class="audio-play">
        <audio id="audio" :src="audioUrl" :autoplay="autoPlay" preload></audio>
        <div v-if="showProgress" class="progress" :style="{ bottom: progressPosition + 'px' }">
            <div class="time left">{{ getAudioCurrentTime }}</div>
            <line-progress-bar
                class="progress-bar"
                ref="progress"
                :duration="audioDuration"
                :progress="audioCurrentTime"
                @progressJump="progressJump"
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
        },
        // 进度条距页面底部高度
        progressPosition: {
            type: Number,
            default: 150
        }
    },
    data() {
        return {
            audioDuration: 0, // audio总时间 s
            audioCurrentTime: 0, // audio已播放时间  s
            audioUpdateInterval: {},
            timeIntervalIsRun: false
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
            if (!this.timeIntervalIsRun) {
                // 立即执行一次
                this.refreshAudioCurrentTime();
                this.audioUpdateInterval = setInterval(() => {
                    this.refreshAudioCurrentTime();
                }, 1000);
                this.timeIntervalIsRun = true;
            }
        },

        // 刷新当前播放时间
        refreshAudioCurrentTime() {
            const audio = document.querySelector("#audio");
            this.audioCurrentTime = audio.currentTime;
        },

        // 停止audio状态 1s间隔
        timeUpdateStop() {
            clearInterval(this.audioUpdateInterval);
            this.timeIntervalIsRun = false;
        },

        // 音乐播放进度跳转 progress 进度
        progressJump(progress) {
            const time = this.audioDuration * (progress / 100);
            // this.timeUpdateStop();
            this.setAudioProgress(time);
            // this.timeUpdateStart();
        },

        // 设置audio当前播放秒数
        setAudioProgress(time) {
            const audio = document.querySelector("#audio");
            audio.currentTime = time; // 会进入audio onplaying事件 !!!!!!!!触发了两个定时任务 progress每秒变2次 导致进度条闪烁
            this.audioCurrentTime = time;
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
    },

    watch: {
        audioDuration: {
            handler() {
                this.$emit("audio-duration-change", this.audioDuration);
            },
            immediate: true
        },
        audioCurrentTime: {
            handler() {
                this.$emit("audio-current-time-change", this.audioCurrentTime);
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
.audio-play {
    .progress {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: 1;
        .time {
            color: #9e9e9e;
            font-size: 10px;
            opacity: 0.8;
        }
        .progress-bar {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0px 8px;
        }
    }
}
</style>
