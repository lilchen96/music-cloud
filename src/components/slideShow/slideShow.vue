<template>
    <div class="slide-show">
        <div
            v-for="(item, index) in list"
            :key="item"
            class="image-item"
            :class="getClassName(index)"
            :style="{ transform: getTranslateStyle(index) + ' translateX(' + translateX + 'px)' }"
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
            default: () => {
                return [
                    "http://p1.music.126.net/SAUL6U5oQM715WGye79VLQ==/109951164988980681.jpg",
                    "http://p1.music.126.net/qV3v_0FRCRLhNY1a_644lA==/109951164989080106.jpg",
                    "http://p1.music.126.net/gfn8202mSvEStU1vBBYyXg==/109951164989041192.jpg"
                ];
            }
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
            active: 0,

            // 图片整体的横向偏移量
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
    computed: {
        // 根据active判断最终位置
        getTranslateStyle() {
            return index => {
                let translateStyle = "";
                const neighbor = this.getNeighbor(this.active, this.list);
                if (index === neighbor.center) {
                    translateStyle = "translate(0,0)";
                }
                if (index === neighbor.left) {
                    translateStyle = "translate(-100%,0)";
                }
                if (index === neighbor.right) {
                    translateStyle = "translate(100%,0)";
                }
                return translateStyle;
            };
        },

        // 是否需要过渡动画 left:center和left需要动画  right:center和right需要动画
        getClassName() {
            return index => {
                // 是否需要过渡动画 left:center和left需要动画  right:center和right需要动画
                let className = "";
                if (this.isTransition) {
                    const neighbor = this.getNeighbor(this.active, this.list);
                    if (index === neighbor.center) {
                        className = "translate-transition";
                    }
                    if (index === neighbor.left && this.direction === "left") {
                        className = "translate-transition";
                    }
                    if (index === neighbor.right && this.direction === "right") {
                        className = "translate-transition";
                    }
                }
                return className;
            };
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
            this.translateX += e.changedTouches[0].pageX - this.currentPosition.x;
            this.currentPosition = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };
        },
        touchend() {
            const touchTime = new Date().getTime() - this.touchstartTime;
            this.isTransition = true;
            const width = document.querySelector(".image-item").clientWidth;

            // 判断滑动方向
            if (this.translateX < -10) {
                this.direction = "left";
            }
            if (this.translateX > 10) {
                this.direction = "right";
            }
            // 滑动速度快 直接切换图片 速度慢 过50%切换 不过50%不切换
            if (touchTime <= 200 || Math.abs(this.translateX) > width * 0.5) {
                if (this.direction === "left") {
                    if (this.active === this.list.length - 1) {
                        this.active = 0;
                    } else {
                        this.active += 1;
                    }
                }
                if (this.direction === "right") {
                    if (this.active === 0) {
                        this.active = this.list.length - 1;
                    } else {
                        this.active -= 1;
                    }
                }
            } else {
                // 图片回弹时 方向实际是改变的
                this.direction = this.direction === "left" ? "right" : "left";
            }
            this.translateX = 0;
        },

        getNeighbor(index, list) {
            const neighbor = {};
            switch (index) {
                case 0:
                    neighbor.left = list.length - 1;
                    neighbor.right = index + 1;
                    break;
                case list.length - 1:
                    neighbor.left = index - 1;
                    neighbor.right = 0;
                    break;
                default:
                    neighbor.left = index - 1;
                    neighbor.right = index + 1;
                    break;
            }
            neighbor.center = index;
            return neighbor;
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
    .translate-transition {
        transition: transform 0.5s;
    }
}
</style>
