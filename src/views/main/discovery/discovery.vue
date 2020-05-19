<template>
    <div class="discovery-section">
        <slide-show :imageList="bannerList" loop></slide-show>
    </div>
</template>

<script>
import slideShow from "@/components/slideShow";

export default {
    components: {
        slideShow
    },
    data() {
        return {
            bannerList: []
        };
    },

    created() {
        this.loadPage();
    },

    methods: {
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
            console.log(this.bannerList);
        }
    }
};
</script>

<style lang="less" scoped></style>
