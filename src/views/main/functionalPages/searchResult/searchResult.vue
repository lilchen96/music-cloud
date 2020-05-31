<template>
    <div class="search-result-section">
        <top-search
            :inputValue="searchValue"
            :icon="icons.backIcon"
            @icon-click="iconClick"
            @show-search-section="showSearchSection"
            @hide-search-section="hideSearchSection"
        ></top-search>
        <div class="search-result-content">
            <div class="comprehensive-content">
                <div class="song-section">
                    <div class="title line">
                        <div class="text">单曲</div>
                    </div>
                    <div class="song-item line" v-for="item in song"></div>
                </div>
                <div class="playlist-section"></div>
                <div class="video-section"></div>
                <div class="artist-section"></div>
                <div class="ablum-section"></div>
            </div>
        </div>
    </div>
</template>

<script>
import backIcon from "@/assets/images/back_icon.png";

import topSearch from "@/views/main/components/topSearch.vue";

export default {
    components: {
        topSearch
    },
    data() {
        return {
            icons: {
                backIcon
            },
            searchValue: this.$route.params.searchValue,
            contentVisible: true
        };
    },
    created() {
        this.loadPage();
    },
    methods: {
        showSearchSection() {
            this.contentVisible = false;
        },
        hideSearchSection() {
            this.contentVisible = true;
        },

        iconClick() {
            this.$router.go(-1);
        },

        async loadPage() {
            // 综合信息
            const { data } = await this.$axios({
                method: "get",
                url: "getSearchList",
                params: {
                    keywords: this.searchValue,
                    type: 1018
                }
            });
            const searchRes = data.result;
            const {
                song: songInfo,
                playList: playListInfo,
                video: videoInfo,
                artist: artistInfo,
                album: albumInfo
            } = searchRes;
            this.songInfo = { more: songInfo.more, moreText: songInfo.moreText, list: songInfo.songs };
            this.playListInfo = {
                more: playListInfo.more,
                moreText: playListInfo.moreText,
                list: playListInfo.playLists
            };
            //  数据处理
            this.videoInfo = { more: videoInfo.more, moreText: videoInfo.moreText, list: videoInfo.videos };
            this.artistInfo = { more: artistInfo.more, moreText: artistInfo.moreText, list: artistInfo.artists };
            this.albumInfo = { more: albumInfo.more, moreText: albumInfo.moreText, list: albumInfo.albums };
        }
    }
};
</script>

<style lang="less" scoped>
.search-result-section {
    .search-title {
        width: calc(100% - 50px);
        height: 52px;
        display: flex;
        .image {
            margin-right: 16px;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        .search-input {
            flex: 1;
            height: 32px;
            margin-top: 12px;
        }
    }
}
</style>
