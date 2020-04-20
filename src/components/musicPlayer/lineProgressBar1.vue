<template>
    <div class="line-progress-bar">
        <div class="inner-line"></div>
        <div
            :class="className"
            :style="{
                animationDuration: duration,
                animationPlayState: playState
            }"
        ></div>
    </div>
</template>

<script>
export default {
    props: {
        // 进度条加载时间
        duration: {
            type: String,
            default: "60s"
        }
    },
    data() {
        return {
            playState: "paused", // 进度条状态
            className: "outer-line1" // class名称用来重置
        };
    },

    methods: {
        // 进度条开始
        progressPlay() {
            this.playState = "running";
        },

        // 进度条暂停
        progressPause() {
            this.playState = "paused";
        },

        // 进度条重置
        progressReset() {
            if (this.className === "outer-line1") {
                this.className = "outer-line2";
            } else {
                this.className = "outer-line1";
            }
        }
    }
};
</script>

<style lang="less" scoped>
@keyframes progress1 {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}
@keyframes progress2 {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}
.line-progress-bar {
    overflow-y: hidden;
    .inner-line {
        background-color: #8a8a8a;
        width: 100%;
        height: 2px;
        border-radius: 10px;
    }
    .outer-line1 {
        background-color: #fff;
        margin-top: -2px;
        width: 100%;
        height: 2px;
        border-radius: 10px;
        animation: progress1 60s linear forwards;
    }
    .outer-line2 {
        background-color: #fff;
        margin-top: -2px;
        width: 100%;
        height: 2px;
        border-radius: 10px;
        animation: progress2 60s linear forwards;
    }
}
</style>
