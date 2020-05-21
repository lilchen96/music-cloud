<template>
    <div class="discovery-section">
        <div class="search-title">
            <div class="image">
                <img :src="icons.cloudIcon" />
            </div>
            <base-input
                class="search-input"
                :inputOptions="searchInputOptions"
                @on-change="searchInputChange"
            ></base-input>
        </div>
        <div class="content">
            <slide-show :imageList="bannerList" autoPlay loop></slide-show>
        </div>
    </div>
</template>

<script>
import slideShow from "@/components/slideShow";

import cloudIcon from "@/assets/images/cloud_icon.png";
import searchIcon from "@/assets/images/search_icon.png";

export default {
    components: {
        slideShow
    },
    data() {
        return {
            icons: { cloudIcon },
            bannerList: [],
            searchInputOptions: {
                value: "",
                type: "text",
                placeholder: "请输入搜索信息",
                style: "icon",
                icon: searchIcon
            }
        };
    },

    created() {
        this.loadPage();
    },

    methods: {
        // 加载页面
        async loadPage() {
            // 查询最新专辑
            const requests = Promise.all([
                this.$axios({
                    method: "get",
                    url: "getBanner"
                })
            ]);
            const [{ data: bannerRes }] = await requests;
            this.bannerList = bannerRes.banners.map(it => it.imageUrl);
        },

        searchInputChange(value) {
            // 搜索接口value
        }
    }
};
</script>

<style lang="less" scoped>
.discovery-section {
    .search-title {
        width: calc(100% - 52px);
        height: 52px;
        padding-left: 10px;
        display: flex;
        .image {
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        .search-input {
            height: 32px;
            flex: 1;
            display: flex;
            margin: 0 16px;
            margin-top: 12px;
        }
    }
}
</style>
