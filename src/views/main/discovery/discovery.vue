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
    beforeRouteEnter(to, from, next) {
        const flag = false;
        if (from.name === "searchResult") {
            next(vm => {
                // 因为当钩子执行前，组件实例还没被创建
                // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
                console.log(vm); // 当前组件的实例
            });
        } else {
        }
        next();

        console.log(this, "beforeRouteEnter"); // undefined
        console.log(to, "组件独享守卫beforeRouteEnter第一个参数");
        console.log(from, "组件独享守卫beforeRouteEnter第二个参数");
        console.log(next, "组件独享守卫beforeRouteEnter第三个参数");
    },
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
