<template>
    <div class="music-list-section">
        <div class=""></div>
        <music-play-list :musicList="musicList"></music-play-list>
    </div>
</template>

<script>
import musicPlayList from "@/components/musicPlayList/musicPlayList.vue";

export default {
    components: {
        musicPlayList
    },
    data() {
        return {
            // 音乐播放列表
            musicList: []
        };
    },

    created() {
        const { playlistId } = this.$route.params;
    }
};
</script>

<style lang="less" scoped></style>
