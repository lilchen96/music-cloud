<template>
    <div class="music-list-section">
        <top-title title="歌单"></top-title>
        <music-play-list class="content" :musicList="musicList" @clickMusic="showMusicPlayer"></music-play-list>
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
        const accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
        if (playlistId === "weekRecord") {
            // 查询本周历史播放
            const res = await this.$axios({
                method: "get",
                url: "getUserRecord",
                params: {
                    uid: accountInfo.userId,
                    type: 1
                }
            });
            this.musicList = res.data.weekData.map(({ song: item }) => ({
                id: item.id,
                name: item.name,
                artistName: item.ar.map(it => it.name).join("/"),
                albumName: item.al.name
            }));
        } else {
            // 查询歌单歌曲信息
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
        }
    },

    methods: {
        showMusicPlayer(ids) {
            this.$emit("showMusicPlayer", ids);
        }
    }
};
</script>

<style lang="less" scoped>
.music-list-section {
    height: 100%;
    display: flex;
    flex-direction: column;
    .content {
        flex: 1;
        height: 100px;
    }
}
</style>
