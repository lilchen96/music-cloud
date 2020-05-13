<template>
    <div class="line-progress-bar" @click="progressJump">
        <div class="inner-line"></div>
        <div class="outer-line" :style="{ transform: 'translateX(' + (progressPercent - 100) + '%' + ')' }"></div>
        <div
            class="draggle-point"
            :style="{ transform: 'translateX(' + (progressPercent / 100) * progressWidth + 'px' + ')' }"
        ></div>
    </div>
</template>

<script>
export default {
    props: {
        // 进度条加载总时间 单位s
        duration: {
            type: Number,
            default: 60
        },
        // 当前时间 单位s
        progress: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            progressPercent: 0, // 进度条 0%
            speed: 1, // 进度条速度
            interval: {}, // 定时任务
            progressWidth: 0, // 进度条长度
            progressIsRun: false
        };
    },

    mounted() {
        this.progressWidth = document.querySelector(".inner-line").clientWidth;
    },

    methods: {
        // 进度条启动
        run() {
            if (!this.progressIsRun) {
                this.refresh();
                this.interval = setInterval(this.refresh, 12);
                this.progressIsRun = true;
            }
        },

        // 进度条停止
        stop() {
            clearInterval(this.interval);
            this.progressIsRun = false;
        },

        // 重置进度条
        reset() {
            this.progressPercent = 0;
        },

        // 进度条速度计算
        getSpeed(duration) {
            // 100 份
            const speed = (100 / duration / 1000) * 12;
            return speed;
        },

        // 刷新进度条
        refresh() {
            this.progressPercent += this.speed;
            if (this.progressPercent === 100) {
                clearInterval(this.interval);
            }
        },

        // 点击进度条 跳进度
        progressJump(e) {
            debugger;
            const positionX = e.offsetX;
            this.progressPercent = (positionX / this.progressWidth) * 100;
            this.$emit("progressJump", this.progressPercent);
        }
    },

    watch: {
        progress: {
            handler() {
                if (this.progress === 0) {
                    this.progressPercent = 0;
                } else {
                    this.progressPercent = (this.progress / this.duration) * 100;
                }
            },
            immediate: true
        },
        duration: {
            handler() {
                this.speed = this.getSpeed(this.duration);
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
.line-progress-bar {
    overflow-y: hidden;
    .inner-line {
        background-color: #b9b9b9;
        width: 100%;
        height: 2px;
        border-radius: 10px;
        opacity: 0.5;
    }

    .outer-line {
        background-color: #e3e3e3;
        margin-top: -2px;
        width: 100%;
        height: 2px;
        border-radius: 10px;
    }
    .draggle-point {
        position: absolute;
        background-color: #fff;
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
}
</style>
