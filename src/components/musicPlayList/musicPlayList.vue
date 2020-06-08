<template>
    <div class="music-play-list">
        <div class="top">
            <div class="right" @click="playAll">
                <div class="icon"><img :src="playActionIcon" /></div>
                <div class="info">
                    <span>播放全部</span> <span class="count">{{ "(共" + musicList.length + "首)" }}</span>
                </div>
            </div>
            <div class="left">
                <div class="star-btn">
                    <img class="icon" src="" />
                    <!-- <span class="info">{{ "收藏(" + otherInfo.starCount + "万)" }}</span> -->
                </div>
            </div>
        </div>
        <div class="content">
            <div class="list-item" v-for="(item, index) in musicList" @click="clickMusic(item.id)">
                <div class="left">
                    <div class="order" :style="{ fontSize: index + 1 >= 100 ? '14px' : '18px' }">{{ index + 1 }}</div>
                    <div class="music-info">
                        <div class="name" :style="{ width: musicInfoWidth + 'px' }">{{ item.name }}</div>
                        <div class="info" :style="{ width: musicInfoWidth + 'px' }">
                            {{ item.artistName + "-" + item.albumName }}
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="operation">
                        <img />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import playActionIcon from "@/assets/images/play_action_icon.png";

export default {
    data() {
        return {
            playActionIcon,
            musicInfoWidth: 200
        };
    },
    props: {
        musicList: {
            type: Array,
            default: []
        },
        // 其他信息
        otherInfo: {
            type: Object,
            default: () => {
                return {
                    musicCount: 0,
                    starCount: 0
                };
            }
        }
    },

    mounted() {
        // mounted
        this.musicInfoWidth = document.querySelector(".content").offsetWidth - 10 - 16 - 25;
    },

    methods: {
        clickMusic(id) {
            this.$emit("clickMusic", [id]);
        },

        playAll() {
            this.$emit(
                "clickMusic",
                this.musicList.map(item => item.id)
            );
        }
    }
};
</script>

<style lang="less" scoped>
.music-play-list {
    height: 100%;
    background-color: #1c1c1c;
    border-radius: 22px;
    color: #fff;
    display: flex;
    flex-direction: column;
    .top {
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        .right {
            display: flex;
            .icon {
                display: flex;
                flex-direction: column;
                justify-content: center;
                img {
                    width: 20px;
                    height: 20px;
                }
            }
            .info {
                margin-left: 12px;
                font-size: 17px;
                .count {
                    font-size: 14px;
                    opacity: 0.5;
                }
            }
        }
        .left {
            .star-btn {
                border-radius: 22px;
                background-color: red;
            }
        }
    }
    .content {
        padding: 10px 0px;
        padding-left: 6px;
        padding-right: 16px;
        flex: 1;
        overflow-y: scroll;
        .list-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0px;
            font-size: 17px;
            .left {
                display: flex;
                justify-content: space-between;
                .order {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 25px;
                    text-align: center;
                    opacity: 0.4;
                }
                .music-info {
                    flex: 1;
                    margin-left: 6px;
                    .name {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .info {
                        margin-top: 3px;
                        font-size: 12px;
                        opacity: 0.8;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
            .right {
                display: flex;
                .operation {
                }
            }
        }
    }
}
</style>
