<template>
    <div class="audio-play-section">
        <audio id="audio" :src="musicUrl" :autoplay="autoPlay" preload></audio>
        <div>{{ getAudioCurrentTime }}</div>
        <div>{{ getAudioDuration }}</div>
    </div>
</template>

<script>
export default {
    props: {
        musicUrl: {
            type: String,
            default: ""
        },
        autoPlay: {
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
        // musicUrl: {
        //     handler() {
        //         const audio = document.querySelector("#audio");
        //         this.audioDuration = audio.duration;
        //     }
        // }
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
            this.$emit("on-audio-play");
        };
        // 当audio暂停时 清除interval
        audio.onpause = () => {
            clearInterval(this.audioUpdateInterval);
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

<style lang="less" scoped></style>
