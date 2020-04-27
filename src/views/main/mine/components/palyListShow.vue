<template>
    <div class="play-list-show">
        <div class="play-list-item" v-for="item in list" :key="item.id" @click="click(item.id)">
            <div class="cover">
                <img :src="item.coverUrl" />
            </div>
            <div class="description">
                <div class="name">{{ item.name }}</div>
                <div class="count">{{ item.count + "首" }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: []
        }
    },

    methods: {
        click(id) {
            this.$router.push({
                name: "musicList",
                query: {
                    playlistId: id
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.play-list-show {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .play-list-item {
        width: 48%;
        display: flex;
        margin-bottom: 16px;
        .cover {
            img {
                width: 60px;
                height: 60px;
                border-radius: 8px;
                border: 0.3px solid #fff;
            }
        }
        .description {
            height: 60px;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .name {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .count {
                margin-top: 6px;
                opacity: 0.4;
                font-size: 12px;
            }
        }
    }
}
</style>
