<template>
    <button class="base-button" @click="onClick">{{ btnOptions.name }}</button>
</template>

<script>
export default {
    props: {
        btnOptions: {
            type: Object,
            default: () => ({
                name: "按钮",
                type: "default",
                size: "normal"
            })
        }
    },

    methods: {
        onClick() {
            this.$emit("click");
        }
    }
};
</script>

<style lang="less" scoped>
.base-button {
    height: 46px;
    width: 100%;
    font-size: 16px;
    border-radius: 50px;
    border: 0px;
    outline: none;
}
</style>
