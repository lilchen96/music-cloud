<template>
    <div class="slide-show">
        <div
            v-for="(item, index) in list"
            :key="item"
            class="image-item"
            :class="dynamicClass(index)"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
        >
            <img class="image" :src="item" />
        </div>
        <div class="guide-point"></div>
    </div>
</template>

<script>
export default {
    props: {
        imageList: {
            type: Array,
            default: [
                "http://p1.music.126.net/SAUL6U5oQM715WGye79VLQ==/109951164988980681.jpg",
                "http://p1.music.126.net/qV3v_0FRCRLhNY1a_644lA==/109951164989080106.jpg",
                "http://p1.music.126.net/gfn8202mSvEStU1vBBYyXg==/109951164989041192.jpg"
            ]
        }

        // // 是否循环
        // loop: {
        //     type: Boolean,
        //     default: true
        // }
    },
    data() {
        return {
            // 图片列表
            list: this.imageList,

            // 当前图片序号
            active: 1
            // 当前图片内的横向偏移量(当切换图片后一定要置为0)
            // translateX: 0,

            // 当前触摸点坐标
            // currentPosition: {
            //     x: 0,
            //     y: 0
            // },

            // 开始触摸时间点 getTime ms
            // touchstartTime: 0,
        };
    },
    computed: {
        dynamicClass() {
            return index => {
                // 是否需要过渡动画 left:center和left需要动画  right:center和right需要动画
                let className = "";
                if (index === this.active - 1) {
                    className = "center-item translate-transition";
                }
                if (index === this.active - 2 || (this.active - 2 <= 0 && index === this.list.length - 1)) {
                    if (this.direction === "left") {
                        className = "left-item translate-transition";
                    } else {
                        className = "left-item";
                    }
                }
                if (index === this.active || (this.active >= this.list.length && index === 0)) {
                    if (this.direction === "right") {
                        className = "right-item translate-transition";
                    } else {
                        className = "right-item";
                    }
                }
                return className;
            };
        }
    },
    methods: {
        touchstart(e) {
            // this.touchstartTime = new Date().getTime();
            this.currentPosition = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };
            // this.isTransition = false;
        },
        touchmove(e) {
            // this.translateX += e.changedTouches[0].pageX - this.currentPosition.x;
            // this.currentPosition = {
            //     x: e.changedTouches[0].pageX,
            //     y: e.changedTouches[0].pageY
            // };
        },
        touchend(e) {
            if (e.changedTouches[0].pageX - this.currentPosition.x > 10) {
                this.direction = "right";
                if (this.active <= 1) {
                    this.active = this.list.length;
                } else {
                    this.active -= 1;
                }
            }
            if (e.changedTouches[0].pageX - this.currentPosition.x < -10) {
                this.direction = "left";
                if (this.active >= this.list.length) {
                    this.active = 1;
                } else {
                    this.active += 1;
                }
            }
        }
    }
};
</script>

<style lang="less" scoped>
.slide-show {
    position: relative;
    .image-item {
        position: absolute;
        width: 100%;
        text-align: center;
        .image {
            width: calc(100% - 32px);
        }
    }
    .left-item {
        transform: translateX(-100%);
    }
    .center-item {
        transform: translateX(0);
    }
    .right-item {
        transform: translateX(100%);
    }
    .translate-transition {
        transition: transform 0.5s;
    }
}
</style>
