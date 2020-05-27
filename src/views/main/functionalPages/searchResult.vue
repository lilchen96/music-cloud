<template>
    <div class="search-result-section">
        <top-search
            :inputValue="searchValue"
            :icon="icons.backIcon"
            @icon-click="iconClick"
            @show-search-section="showSearchSection"
            @hide-search-section="hideSearchSection"
        ></top-search>
    </div>
</template>

<script>
import backIcon from "@/assets/images/back_icon.png";

import topSearch from "@/views/main/components/topSearch.vue";

export default {
    components: {
        topSearch
    },
    data() {
        return {
            icons: {
                backIcon
            },
            searchValue: this.$route.params.searchValue,
            contentVisible: true
        };
    },
    methods: {
        showSearchSection() {
            this.contentVisible = false;
        },
        hideSearchSection() {
            this.contentVisible = true;
        },

        iconClick() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="less" scoped>
.search-result-section {
    .search-title {
        width: calc(100% - 50px);
        height: 52px;
        display: flex;
        .image {
            margin-right: 16px;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        .search-input {
            flex: 1;
            height: 32px;
            margin-top: 12px;
        }
    }
}
</style>
