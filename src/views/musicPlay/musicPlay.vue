<template>
    <div class="container">
        <div class="top">
            <div class="back-btn icon-outer">
                <img class="icon" :src="backIcon" />
            </div>
            <div class="music-title">
                <div class="music-name">
                    {{ "musicName" }}
                </div>
                <div class="music-author">
                    <div>{{ "musicAuthor" }}</div>
                    <div class="icon-outer">
                        <img class="icon" :src="rightArrowIcon" />
                    </div>
                </div>
            </div>
            <div class="top-operations">
                <div class="operation-item icon-outer">
                    <img class="icon" :src="shareIcon" />
                </div>
            </div>
        </div>
        <div class="content"></div>
        <div class="bottom">
            <div class="top-operations">
                <div class="icon-outer">
                    <img class="icon" :src="heartIcon" />
                </div>
                <!-- <div class="icon-outer">
                    <img class="icon" :src="rightArrowIcon" />
                </div>
                <div class="icon-outer">
                    <img class="icon" :src="rightArrowIcon" />
                </div> -->
            </div>
            <div class="progress-bar">
                <audio></audio>
            </div>
            <div class="bottom-operations">
                <div class="icon-outer">
                    <img class="icon" :src="heartIcon" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import backIcon from "@/assets/images/back_icon.png";
import rightArrowIcon from "@/assets/images/right_arrow_icon.png";
import shareIcon from "@/assets/images/share_icon.png";
import heartIcon from "@/assets/images/heart_icon.png";
import heartFillIcon from "@/assets/images/heart_fill_icon.png";

export default {
    data() {
        return {
            backIcon,
            shareIcon,
            rightArrowIcon,
            heartIcon,
            heartFillIcon
        };
    }
};
</script>

<style lang="less" scoped>
.container {
    background-color: transparent;
    background-image: url("../../assets/images/play_background.png");
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    padding: 0px 10px;
    .top {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        color: #fff;
        .back-btn {
        }
        .music-title {
            display: flex;
            flex-direction: column;
            text-align: center;
            .music-name {
                font-size: 17px;
            }
            .music-author {
                display: flex;
                height: 20px;
                .icon {
                    width: 13px;
                    height: 13px;
                }
            }
        }
        .top-operations {
            .operation-item {
            }
        }

        .icon {
            width: 28px;
            height: 28px;
        }
    }
    .content {
        flex: 1;
    }
    .bottom {
        height: 300px;
        .top-operations {
            display: flex;
            justify-content: center;
        }
        .progress-bar {
        }
        .bottom-operations {
            display: flex;
            justify-content: center;
        }
        .icon {
            width: 28px;
            height: 28px;
        }
    }

    .icon-outer {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
