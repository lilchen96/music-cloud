<template>
    <div style="height:100%">
        <div class="background-image" :style="{ backgroundImage: 'url(' + backgroundUrl + ')' }"></div>
        <div class="mine-section">
            <div class="mine-top">
                <div class="top-left">
                    <img class="icon" :src="icons.cloudIcon" />
                </div>
                <div class="info">
                    <div class="left">
                        <div class="avatar">
                            <img class="image" :src="avatarUrl" />
                        </div>
                        <div class="name">{{ nickname }}</div>
                    </div>
                    <!-- <div class="right"></div> -->
                </div>
                <div class="operation">
                    <div class="operation-item">
                        <img class="icon" :src="" />
                    </div>
                    <div class="operation-item"></div>
                    <div class="operation-item"></div>
                    <div class="operation-item"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cloudIcon from "@/assets/images/cloud_icon.png";

export default {
    data() {
        return {
            icons: {
                cloudIcon
            },
            userId: "",
            avatarUrl: "",
            nickname: "",
            backgroundUrl: ""
        };
    },

    created() {
        const accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
        this.userId = accountInfo.userId;
        this.nickname = accountInfo.nickname;
        this.avatarUrl = accountInfo.avatarUrl;
        this.backgroundUrl = accountInfo.backgroundUrl;
    }
};
</script>

<style lang="less" scoped>
.background-image {
    position: absolute;
    height: 30%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.4;
}
.mine-section {
    position: relative;
    height: 100%;
    overflow: hidden auto;
    .mine-top {
        padding: 10px 18px;
        height: 30%;
        .top-left {
            .icon {
            }
        }
        .info {
            display: flex;
            justify-content: space-between;
            padding-top: 25px;
            .left {
                display: flex;
                .avatar {
                    .image {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                }
                .name {
                    color: #fff;
                    font-size: 16px;
                    padding: 6px 8px;
                }
            }
            .right {
            }
        }
        .operation {
            .operation-item {
            }
        }
    }
}
</style>
