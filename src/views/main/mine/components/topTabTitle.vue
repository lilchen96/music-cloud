<template>
    <div class="top-tab-title">
        <div class="top-title">
            <div
                class="top-title-item"
                :class="activeTab === item.id ? 'checked' : ''"
                v-for="(item, index) in tabList"
                :key="index"
                @click="select(item.id)"
            >
                <span class="name">{{ item.name }}</span>
                <span class="count" v-if="item.count">{{ item.count }}</span>
            </div>
        </div>
        <template v-for="(item, index) in tabList">
            <!-- 缓存 不需要重新渲染-->
            <keep-alive>
                <slot v-if="item.id === activeTab" :name="item.id"></slot>
            </keep-alive>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: ""
        };
    },
    props: {
        tabList: {
            type: Array,
            default: []
        }
    },

    created() {
        this.activeTab = this.tabList[0].id;
    },

    methods: {
        select(id) {
            this.activeTab = id;
        }
    }
};
</script>

<style lang="less" scoped>
.top-tab-title {
    .top-title {
        display: flex;
        margin-bottom: 12px;
        .top-title-item {
            margin-right: 20px;
            opacity: 0.4;
            .name {
                font-size: 16px;
            }
            .count {
                font-size: 12px;
            }
        }
        .checked {
            opacity: 1;
        }
    }
}
</style>
