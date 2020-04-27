<template>
    <div class="music-list-section">
        <div class=""></div>
        <music-play-list :musicList="musicList" @clickMusic="showMusicPlayer"></music-play-list>
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
            // 音乐播放列表p
            musicList: []
        };
    },

    async created() {
        const { playlistId } = this.$route.query;

        // 查询歌曲信息
        const res = await this.$axios({
            method: "get",
            url: "getPlaylistDeatil",
            params: {
                id: playlistId
            }
        });

        this.musicList = res.data.playlist.tracks.map(item => ({
            id: item.id,
            name: item.name,
            artistName: item.ar.map(it => it.name).join("/"),
            albumName: item.al.name
        }));
    },

    methods: {
        showMusicPlayer(id) {
            this.$emit("showMusicPlayer", id);
        }
    }
};
</script>

<style lang="less" scoped></style>
