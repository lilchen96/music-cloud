<template>
    <div class="music-module-list">
        <div class="list">
            <div class="list-item" v-for="item in list" :key="item.link" @click="click(item.link)">
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
        click(link) {
            this.$router.push({
                name: link
            });
        }
    }
};
</script>

<style lang="less" scoped>
.music-module-list {
    display: flex;
    overflow: auto hidden;
    .list {
        flex: 1;
        display: flex;
        .list-item {
            width: 115px;
            height: 155px;
            background-color: #3d3d3d;
            border-radius: 12px;
            text-align: center;
            color: #fff;
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
                opacity: 0.5;
                margin-top: 25px;
            }
        }
        .list-item:not(:first-child) {
            margin-left: 10px;
        }
    }
}
</style>
