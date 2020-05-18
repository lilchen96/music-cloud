<template>
    <div class="slide-show">
        <div
            class="image-list"
            :class="isTransition ? 'translate-transition' : ''"
            :style="{ transform: 'translate(-' + (active - 1) * 100 + '%,0) translateX(' + translateX + 'px)' }"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
        >
            <div class="image-item" v-for="item in imageList">
                <img class="image" :src="item" />
            </div>
        </div>
        <div class="guide-point"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 当前图片序号
            active: 1,
            // 当前图片内的横向偏移量(当切换图片后一定要置为0)
            translateX: 0,

            // 当前触摸点坐标
            currentPosition: {
                x: 0,
                y: 0
            },

            // 开始触摸时间点 getTime ms
            touchstartTime: 0,

            // 是否需要过渡动画 touchend结算时需要过渡动画
            isTransition: false
        };
    },
    props: {
        imageList: {
            type: Array,
            default: [
                "http://p1.music.126.net/SAUL6U5oQM715WGye79VLQ==/109951164988980681.jpg",
                "http://p1.music.126.net/qV3v_0FRCRLhNY1a_644lA==/109951164989080106.jpg",
                "http://p1.music.126.net/gfn8202mSvEStU1vBBYyXg==/109951164989041192.jpg"
            ]
        },

        // 是否循环
        loop: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        touchstart(e) {
            this.touchstartTime = new Date().getTime();
            this.currentPosition = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };
            this.isTransition = false;
        },
        touchmove(e) {
            // let direction = "";
            // if (e.changedTouches[0].pageX > this.currentPosition.x) {
            //     direction = "right";
            // } else {
            //     direction = "left";
            // }
            // if (
            //     !this.loop &&
            //     ((this.active === this.imageList.length && direction === "left") ||
            //         (this.active === 1 && direction === "right"))
            // ) {
            //     }
            this.translateX += e.changedTouches[0].pageX - this.currentPosition.x;
            this.currentPosition = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };
        },
        touchend() {
            const touchTime = new Date().getTime() - this.touchstartTime;
            this.isTransition = true;
            const width = document.querySelector(".image-list").clientWidth;
            // 判断滑动方向
            let direction = "";
            if (this.translateX < -10) {
                direction = "left";
            }
            if (this.translateX > 10) {
                direction = "right";
            }

            // 滑动速度快 直接切换图片 速度慢 过50%切换 不过50%不切换
            if (touchTime <= 200 || Math.abs(this.translateX) > width * 0.5) {
                if (direction === "left") {
                    if (this.active === this.imageList.length) {
                        this.active = this.loop ? 1 : this.imageList.length;
                    } else {
                        this.active += 1;
                    }
                }
                if (direction === "right") {
                    if (this.active === 1) {
                        this.active = this.loop ? this.imageList.length : 1;
                    } else {
                        this.active -= 1;
                    }
                }
            }
            this.translateX = 0;
        }
    },

    watch: {}
};
</script>

<style lang="less" scoped>
.slide-show {
    .image-list {
        white-space: nowrap;
        .image-item {
            display: inline-block;
            width: 100%;
            text-align: center;
            .image {
                width: calc(100% - 32px);
            }
        }
    }
    .translate-transition {
        transition: transform 0.5s;
    }
}
</style>
