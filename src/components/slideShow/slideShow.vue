<template>
    <div class="slide-show" :style="{ height: containerHeight + 'px' }">
        <div
            v-for="(item, index) in list"
            :key="index"
            class="slide-show-image-item"
            :class="getClassName(index)"
            :style="{
                width: containerWidth + 'px',
                transform: getTranslateStyle(index) + getTranslateXStyle(index),
                zIndex: getZIndexStyle(index),
                opacity: getOpacityStyle(index)
            }"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
        >
            <img class="slide-show-image" :src="item" @click="clickImage(item, index)" />
        </div>
        <div v-if="guide" class="guide-point" :style="{ left: (containerWidth - guideWidth) / 2 + 'px' }">
            <div
                v-for="(item, index) in getPointList"
                :key="index"
                class="point-item"
                :class="getPointClass(index)"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "IllmaticSlideShow",
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
        },
        // 是否需要导航点
        guide: {
            type: Boolean,
            default: true
        },
        // 是否可滑动切换
        control: {
            type: Boolean,
            default: true
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
        getOpacityStyle() {
            return index => {
                let opacity = 0;
                const neighbor = this.getNeighbor(this.active, this.list);
                if (index === neighbor.center || index === neighbor.right || index === neighbor.left) {
                    opacity = 1;
                }
                return opacity;
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
        },
        getPointList() {
            if (this.imageList.length === 2) {
                return this.imageList;
            }
            return this.list;
        },
        getPointClass() {
            return index => {
                let className = "";
                if (this.imageList.length === 2) {
                    if (index === this.active || index === this.active - 2) {
                        className = "active";
                    }
                } else if (index === this.active) {
                    className = "active";
                }
                return className;
            };
        }
    },
    mounted() {},
    methods: {
        clickImage(item, index) {
            if (this.imageList.length === 2 && index > 1) {
                this.$emit("click", { image: item, index: index - 2 });
            } else {
                this.$emit("click", { image: item, index });
            }
        },
        touchstart(e) {
            if (!this.control) {
                return;
            }
            if (this.autoPlay && this.list.length > 1) {
                this.autoPlayPause();
            }
            this.touchstartTime = new Date().getTime();
            this.currentPosition = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };
            this.isTransition = false;
        },
        touchmove(e) {
            if (!this.control) {
                return;
            }
            // 不循环的边界判断 锁死
            if (
                (!this.loop && this.active === 0 && e.changedTouches[0].pageX - this.currentPosition.x >= 0) ||
                (!this.loop &&
                    this.active === this.list.length - 1 &&
                    e.changedTouches[0].pageX - this.currentPosition.x <= 0) ||
                this.list.length === 1
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
            if (!this.control) {
                return;
            }
            const touchTime = new Date().getTime() - this.touchstartTime;
            this.isTransition = true;
            // 判断滑动方向
            if (this.translateX < -10) {
                this.direction = "left";
            } else if (this.translateX > 10) {
                this.direction = "right";
            } else {
                this.direction = "";
            }
            // 滑动速度快 直接切换图片 速度慢 过50%切换 不过50%不切换
            if (touchTime <= 200 || Math.abs(this.translateX) > this.containerWidth * 0.5) {
                this.active = this.getNextActive(this.direction);
            } else {
                // 图片回弹时 方向实际是改变的
                this.direction = this.direction === "left" ? "right" : "left";
            }
            this.translateX = 0;
            if (this.autoPlay && this.list.length > 1) {
                this.autoPlayPlay();
            }
        },
        getNeighbor(index, list) {
            const neighbor = {};
            neighbor.center = index;
            if (list.length > 1) {
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
            } else {
                neighbor.left = -1;
                neighbor.right = -1;
            }
            return neighbor;
        },
        // left or right
        getNextActive(direction) {
            let result = this.active;
            switch (direction) {
                case "left":
                    result = this.active + 1;
                    if (this.active === this.list.length - 1) {
                        result = this.loop ? 0 : this.list.length - 1;
                    }
                    break;
                case "right":
                    result = this.active - 1;
                    if (this.active === 0) {
                        result = this.loop ? this.list.length - 1 : 0;
                    }
                    break;
                case "":
                    result = this.active;
                    break;
                default:
                    result = this.active;
                    break;
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
                if (this.autoPlay && this.list.length > 1) {
                    this.autoPlayPlay();
                } else {
                    this.autoPlayPause();
                }
            },
            immediate: true
        },
        imageList: {
            handler() {
                if (this.imageList.length === 2) {
                    this.list = this.imageList.concat(this.imageList);
                } else {
                    this.list = this.imageList;
                }
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
    width: 100%;
    overflow: hidden;
    position: relative;
    .slide-show-image-item {
        position: absolute;
        width: 100%;
        text-align: center;
        z-index: -1;
        .slide-show-image {
            width: auto;
            height: auto;
            max-width: calc(100% - 32px);
            max-height: 100%;
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
