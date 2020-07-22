<template>
    <div class="music-module-list">
        <div class="list">
            <div class="list-item" v-for="item in list" :key="item.id" @click="click(item.link, item.query)">
                <div class="item">
                    <div class="icon">
                        <img :src="item.icon" />
                    </div>
                    <div class="name">
                        {{ item.name }}
                    </div>
                    <div class="description">
                        {{ item.description }}
                    </div>
                </div>
                <div
                    class="background-image"
                    v-if="item.coverImage"
                    :style="{ backgroundImage: 'url(' + item.coverImage + ')' }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 
        list: {
            type: Array,
            default: []
        }
    },

    methods: {
        // 查询点击
        click(link, query) {
            this.$router.push({
                name: link,
                query
            });
        }
    }
};
</script>

<style lang="less" scoped>
.music-module-list {
    overflow-x: scroll;
    .list {
        white-space: nowrap;
    }
    .list-item {
        position: relative;
        width: 115px;
        height: 155px;
        background-color: #3d3d3d;
        border-radius: 12px;
        text-align: center;
        color: #fff;
        display: inline-block;
        .background-image {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 115px;
            height: 155px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            opacity: 0.4;
        }
        .item {
            position: relative;
            z-index: 1;
            .icon {
                margin-top: 45px;
                img {
                    width: 28px;
                    height: 28px;
                }
            }
            .name {
            }
            .description {
                opacity: 0.6;
                margin-top: 25px;
            }
        }
    }
    .list-item:not(:first-child) {
        margin-left: 10px;
    }
}
</style>
