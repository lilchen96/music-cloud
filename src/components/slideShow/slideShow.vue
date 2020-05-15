<template>
    <div class="slide-show">
        <div
            class="image-list"
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
            // 横向偏移量
            translateX: 0,

            // 触摸起始坐标
            currentPosition: {
                x: 0,
                y: 0
            }
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
        }
    },
    methods: {
        touchstart(e) {
            // debugger;
            this.currentPosition = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };
        },
        touchmove(e) {
            // if (this.active === 3) {
            //     return;
            // }
            this.translateX += e.changedTouches[0].pageX - this.currentPosition.x;
            this.currentPosition = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };
        },
        touchend(e) {
            // debugger;
            // if (e.changedTouches[0].pageX > this.currentPosition.x && this.translateX < -100) {
            //     this.active -= 1;
            //     this.translateX = 0;
            // } else {
            //     this.active += 1;
            //     this.translateX = 0;
            // }
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
}
</style>
