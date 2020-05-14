<template> </template>

<script>
export default {
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
        }
    }
};
</script>

<style lang="less" scoped></style>
