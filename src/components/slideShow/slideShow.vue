<template>
    <div class="slide-show" :style="{ height: containerHeight + 'px' }">
        <div
            v-for="(item, index) in list"
            :key="item"
            class="slide-show-image-item"
            :class="getClassName(index)"
            :style="{
                width: containerWidth + 'px',
                transform: getTranslateStyle(index) + getTranslateXStyle(index),
                zIndex: getZIndexStyle(index)
            }"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
        >
            <img class="slide-show-image" :src="item" />
        </div>
        <div class="guide-point" :style="{ left: (containerWidth - guideWidth) / 2 + 'px' }">
            <div
                v-for="(item, index) in list"
                :key="item"
                class="point-item"
                :class="active === index ? 'active' : ''"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 数据源
        imageList: {
            type: Array,
            default: []
        },

        // 是否循环
        loop: {
            type: Boolean,
            default: true
        },

        // 是否自动播放
        autoPlay: {
            type: Boolean,
            default: true
        },

        // 自动播放间隔时间 s
        interval: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            // 图片列表
            list: [],

            // 当前图片序号
            active: 0,

            // 图片整体的横向偏移s量
            translateX: 0,

            // 当前触摸点坐标
            currentPosition: {
                x: 0,
                y: 0
            },

            // 开始触摸时间点 getTime ms
            touchstartTime: 0,

            // 是否需要过渡动画 touchend结算时需要过渡动画
            isTransition: false,

            // 外容器宽度
            containerWidth: 200,

            // 外容器高度
            containerHeight: 100,

            // 导航点宽度
            guideWidth: 10,

            // 自动播放
            autoPlayInterval: null
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

        getTranslateXStyle() {
            return index => {
                let translateXStyle = "";
                const neighbor = this.getNeighbor(this.active, this.list);

                if (index === neighbor.center || index === neighbor.right || index === neighbor.left) {
                    translateXStyle = ` translateX(${this.translateX}px)`;
                }
                return translateXStyle;
            };
        },
        getZIndexStyle() {
            return index => {
                let zIndex = -1;
                const neighbor = this.getNeighbor(this.active, this.list);

                if (index === neighbor.center || index === neighbor.right || index === neighbor.left) {
                    zIndex = 0;
                }
                return zIndex;
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
    mounted() {},
    methods: {
        touchstart(e) {
            this.autoPlayPause();
            this.touchstartTime = new Date().getTime();
            this.currentPosition = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };
            this.isTransition = false;
        },
        touchmove(e) {
            // 不循环的边界判断 锁死
            if (
                (!this.loop && this.active === 0 && e.changedTouches[0].pageX - this.currentPosition.x >= 0) ||
                (!this.loop &&
                    this.active === this.list.length - 1 &&
                    e.changedTouches[0].pageX - this.currentPosition.x <= 0)
            ) {
                return;
            }

            this.translateX += e.changedTouches[0].pageX - this.currentPosition.x;
            this.currentPosition = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };
        },
        touchend() {
            const touchTime = new Date().getTime() - this.touchstartTime;
            this.isTransition = true;
            // 判断滑动方向
            if (this.translateX < -10) {
                this.direction = "left";
            }
            if (this.translateX > 10) {
                this.direction = "right";
            }
            // 滑动速度快 直接切换图片 速度慢 过50%切换 不过50%不切换
            if (touchTime <= 200 || Math.abs(this.translateX) > this.containerWidth * 0.5) {
                this.active = this.getNextActive(this.direction);
            } else {
                // 图片回弹时 方向实际是改变的
                this.direction = this.direction === "left" ? "right" : "left";
            }
            this.translateX = 0;
            this.autoPlayPlay();
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
        },

        // left or right
        getNextActive(direction) {
            let result = direction === "left" ? this.active + 1 : this.active - 1;
            if (this.active === 0 && direction === "right") {
                result = this.loop ? this.list.length - 1 : 0;
            }
            if (this.active === this.list.length - 1 && direction === "left") {
                result = this.loop ? 0 : this.list.length - 1;
            }
            return result;
        },

        // 自动播放暂停
        autoPlayPause() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
            }
        },

        // 自动播放开始
        autoPlayPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.isTransition = true;
                this.direction = "left";
                this.active = this.getNextActive("left");
            }, this.interval * 1000);
        }
    },

    watch: {
        autoPlay: {
            handler() {
                if (this.autoPlay) {
                    this.autoPlayPlay();
                } else {
                    this.autoPlayPause();
                }
            },
            immediate: true
        },

        imageList: {
            handler() {
                this.list = this.imageList;
                if (this.list.length > 0) {
                    this.$nextTick(() => {
                        this.containerWidth = document.querySelector(".slide-show").clientWidth;
                        // 计算容器高度
                        document.querySelector(".slide-show-image").onload = () => {
                            this.containerHeight = document.querySelector(".slide-show-image-item").clientHeight;
                        };
                        // 计算导航点宽度
                        this.guideWidth = document.querySelector(".guide-point").clientWidth;
                    });
                }
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
.slide-show {
    position: relative;
    width: 100%;
    .slide-show-image-item {
        position: absolute;
        width: 100%;
        text-align: center;
        z-index: -1;
        .slide-show-image {
            width: calc(100% - 32px);
        }
    }
    .guide-point {
        position: absolute;
        bottom: 8px;
        display: flex;
        justify-content: center;
        .point-item {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #fff;
            margin: 0px 2px;
            opacity: 0.6;
        }
        .active {
            opacity: 1;
            background-color: red;
        }
    }
    .translate-transition {
        transition: transform 0.5s;
    }
}
</style>
