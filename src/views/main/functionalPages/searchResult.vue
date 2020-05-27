<template>
    <div class="search-result-section">
        <top-search
            :icon="icons.backIcon"
            @show-search-section="showSearchSection"
            @hide-search-section="hideSearchSection"
        ></top-search>
    </div>
</template>

<script>
import searchIcon from "@/assets/images/search_icon.png";
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
            searchInputOptions: {
                value: "",
                type: "text",
                placeholder: "请输入搜索信息",
                style: "icon",
                icon: searchIcon
            },
            contentVisible: true
        };
    },
    methods: {
        showSearchSection() {
            this.contentVisible = false;
        },
        hideSearchSection() {
            this.contentVisible = true;
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
