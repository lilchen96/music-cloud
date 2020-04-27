<template>
    <div class="music-play-list">
        <div class="top">
            <div class="right">
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
            <div class="list-item" v-for="(item, index) in musicList">
                <div class="left">
                    <div class="order">{{ index + 1 }}</div>
                    <div class="music-info">
                        <div class="name">{{ item.name }}</div>
                        <div class="info">{{}}</div>
                    </div>
                </div>
                <div class="right">
                    <div class="operation">
                        <img />
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom"></div>
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
    }
};
</script>

<style lang="less" scoped>
.music-play-list {
    background-color: #1c1c1c;
    border-radius: 22px;
    padding: 16px 16px;
    .top {
        display: flex;
        justify-content: space-between;
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
        .list-item {
            display: flex;
            justify-content: space-between;
            .left {
                display: flex;
                .order {
                }
                .music-info {
                    .name {
                    }
                    .info {
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
