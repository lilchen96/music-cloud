<template>
    <div class="circle-progress-bar">
        <div :style="circleStyle()" class="circle-progress-bar-inner"></div>
        <div
            :style="{ width: circleOptions.width + 'px', height: circleOptions.height + 'px' }"
            class="circle-progress-bar-outer"
        >
            <div class="wrapper left">
                <div
                    :style="circleStyle('left')"
                    class="circle left-circle"
                    :class="direction === 'anticlockwise' ? 'anticlockwise' : 'clockwise'"
                ></div>
            </div>
            <div class="wrapper right">
                <div
                    :style="circleStyle('right')"
                    class="circle right-circle"
                    :class="direction === 'anticlockwise' ? 'anticlockwise' : 'clockwise'"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        circleOptions: {
            type: Object,
            default: () => {
                return {
                    width: 100,
                    height: 100,
                    borderWidth: 4,
                    borderColor: "red",
                    backGroundColor: "grey"
                };
            }
        },
        // 方向 clockwise anticlockwise
        direction: {
            type: String,
            default: "clockwise"
        },
        // 一圈的时间 s
        duration: {
            type: Number,
            default: 5
        }
    },

    computed: {
        circleStyle() {
            return name => {
                let result = {
                    width: `${this.circleOptions.width - this.circleOptions.borderWidth * 2}px`,
                    height: `${this.circleOptions.height - this.circleOptions.borderWidth * 2}px`,
                    borderWidth: `${this.circleOptions.borderWidth}px`
                };
                if (!name) {
                    result = Object.assign(result, {
                        borderColor: this.circleOptions.backGroundColor
                    });
                } else {
                    result = Object.assign(result, {
                        borderColor: this.circleOptions.borderColor,
                        animationDuration: `${this.duration}s`,
                        animationDelay:
                            (this.direction === "anticlockwise" && name === "left") ||
                            (this.direction === "clockwise" && name === "right")
                                ? "0s"
                                : `${this.duration}s`
                    });
                }
                return result;
            };
        }
    }
};
</script>

<style lang="less" scoped>
// 顺时针
@-webkit-keyframes clockwise {
    0% {
        -webkit-transform: rotate(45deg);
    }
    100% {
        -webkit-transform: rotate(225deg);
    }
}

// 逆时针
@-webkit-keyframes anticlockwise {
    0% {
        transform: rotate(45deg);
    }
    100% {
        transform: rotate(-135deg);
    }
}
.circle-progress-bar {
    .circle-progress-bar-inner {
        position: relative;
        border-radius: 50%;
        border-style: solid;
    }
    .circle-progress-bar-outer {
        position: absolute;
        top: 0;
        display: flex;
        .wrapper {
            position: relative;
            width: 50%;
            height: 100%;
            overflow: hidden;
            .circle {
                position: absolute;
                border-radius: 50%;
                border-style: solid;
                transform: rotate(45deg);
                animation-fill-mode: forwards;
                animation-timing-function: linear;
                animation-iteration-count: 1;
            }
            .clockwise {
                animation-name: clockwise;
            }
            .anticlockwise {
                animation-name: anticlockwise;
            }
            .left-circle {
                left: 0;
                border-bottom-color: transparent !important;
                border-left-color: transparent !important;
            }
            .right-circle {
                right: 0;
                border-top-color: transparent !important;
                border-right-color: transparent !important;
            }
        }
    }
}
</style>
