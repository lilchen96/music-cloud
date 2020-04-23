<template>
    <music-module-list :list="list"></music-module-list>
</template>

<script>
import musicModuleList from "@/views/main/mine/components/musicModuleList.vue";
import heartFillIcon from "@/assets/images/heart_fill_icon.png";

export default {
    components: {
        musicModuleList
    },
    data() {
        return {
            list: [
                {
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                },
                {
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                },
                {
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                },
                {
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                },
                {
                    link: "a",
                    icon: heartFillIcon,
                    name: "我喜欢的音乐",
                    description: "最爱的音乐"
                }
            ]
        };
    }
};
</script>

<style></style>
