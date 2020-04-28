<template>
    <div class="music-play-list">
        <div class="top">
            <div class="right" @click="playAll">
                <img class="icon" src="" />
                <span class="info">播放全部</span>
                <!-- <span class="count">{{ "(共" + otherInfo.musicCount + "首)" }}</span> -->
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
                    <div class="order">{{ index + 1 }}</div>
                    <div class="music-info">
                        <div class="name">{{ item.name }}</div>
                        <div class="info">{{ item.artistName + "-" + item.albumName }}</div>
                    </div>
                </div>
                <div class="right">
                    <div class="operation">
                        <img />
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="bottom"></div> -->
    </div>
</template>

<script>
export default {
    props: {
        musicList: {
            type: Array,
            default: []
        },
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
        font-size: 16px;
        padding: 10px 16px;
        .right {
            .icon {
            }
            .info {
            }
            .count {
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
        padding: 10px 16px;
        flex: 1;
        overflow-y: scroll;
        .list-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0px;
            .left {
                display: flex;
                .order {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    font-size: 16px;
                    opacity: 0.4;
                }
                .music-info {
                    margin-left: 16px;
                    .name {
                        font-size: 16px;
                    }
                    .info {
                        font-size: 12px;
                        opacity: 0.8;
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
