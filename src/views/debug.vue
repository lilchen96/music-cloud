<template>
    <line-progress-bar></line-progress-bar>
</template>

<script>
import lineProgressBar from "@/components/musicPlayer/lineProgressBar.vue";

export default {
    components: {
        lineProgressBar
    },
    data() {
        return {
            inputOptions: {
                value: "123",
                placeholder: "请输入",
                style: "line"
            }
        };
    }
};
</script>

<style></style>
