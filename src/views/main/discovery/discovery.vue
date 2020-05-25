<template>
    <div class="discovery-section">
        <top-search
            :icon="icons.cloudIcon"
            @show-search-section="showSearchSection"
            @hide-search-section="hideSearchSection"
        ></top-search>
        <div v-if="contentVisible" class="content">
            <slide-show :imageList="bannerList" autoPlay loop></slide-show>
        </div>
    </div>
</template>

<script>
import slideShow from "@/components/slideShow";
import topSearch from "@/views/main/components/topSearch.vue";

import cloudIcon from "@/assets/images/cloud_icon.png";

export default {
    components: {
        slideShow,
        topSearch
    },
    data() {
        return {
            icons: { cloudIcon },
            // 轮播图
            bannerList: [],
            // 默认搜索信息
            defaultSearch: {
                realkeyword: "",
                showKeyword: ""
            },
            contentVisible: true
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

            // 轮播图
            this.bannerList = bannerRes.banners.map(it => it.imageUrl);
        },

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
.discovery-section {
}
</style>
