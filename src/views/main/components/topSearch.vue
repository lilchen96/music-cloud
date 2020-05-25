<template>
    <div class="top-search">
        <div class="search-title">
            <div v-if="!searchSectionVisible" class="image">
                <img :src="icon" />
            </div>
            <div class="search-input" @click="showSearchSection">
                <base-input :inputOptions="searchInputOptions" @on-change="searchInputChange"></base-input>
            </div>
            <div v-if="searchSectionVisible" class="cancel" @click="hideSearchSection">
                取消
            </div>
        </div>
        <div v-if="suggestListVisible" class="suggest-list">
            <div class="suggest-item" v-for="item in suggestList" :key="item">
                <div class="icon"><img :src="icons.searchIcon" /></div>
                <div class="content">{{ item }}</div>
            </div>
        </div>
        <div v-if="searchSectionVisible && !suggestListVisible" class="search-section">
            <div class="module-item">
                <div class="title">搜索历史</div>
                <div class="history"></div>
            </div>
            <div class="module-item">
                <div class="title">热搜榜</div>
                <div class="hot-search">
                    <div
                        class="hot-search-item"
                        v-for="(item, index) in hotSearch"
                        :key="item.searchWord"
                        @click="clickHotItem"
                    >
                        <div class="index" :class="index <= 3 ? 'hot' : ''">{{ index + 1 }}</div>
                        <div class="info">
                            <div class="name">{{ item.searchWord }}<img :src="item.iconUrl" /></div>
                            <div class="desc">{{ item.content }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchIcon from "@/assets/images/search_icon.png";

export default {
    props: ["icon"],
    data() {
        return {
            icons: {
                searchIcon
            },
            searchInputOptions: {
                value: "",
                type: "text",
                placeholder: "请输入搜索信息",
                style: "icon",
                icon: searchIcon
            },
            searchSectionVisible: false,
            suggestListVisible: false,
            hotSearch: [],
            suggestList: []
        };
    },

    created() {
        this.loadSection();
    },

    methods: {
        showSearchSection() {
            this.searchSectionVisible = true;
            this.$emit("show-search-section");
        },
        hideSearchSection() {
            this.searchSectionVisible = false;
            this.suggestListVisible = false;
            this.searchInputOptions.value = "";
            this.$emit("hide-search-section");
        },

        async searchInputChange(value) {
            // 搜索接口value
            if (value) {
                const { data } = await this.$axios({
                    method: "get",
                    url: "getSearchSuggest",
                    params: {
                        type: "mobile",
                        keywords: value
                    }
                });
                this.suggestList = data.result.allMatch ? data.result.allMatch.map(it => it.keyword) : [];
            }
            this.suggestListVisible = !!value;
        },

        clickHotItem() {},

        async loadSection() {
            const requests = Promise.all([
                this.$axios({
                    method: "get",
                    url: "getSearchDefault"
                }),
                this.$axios({
                    method: "get",
                    url: "getHotSearch"
                })
            ]);
            const [{ data: defaultSearchRes }, { data: hotSearchRes }] = await requests;

            // 默认搜索值
            this.defaultSearch = {
                realkeyword: defaultSearchRes.data.realkeyword,
                showKeyword: defaultSearchRes.data.showKeyword
            };
            this.searchInputOptions.placeholder = this.defaultSearch.showKeyword;

            // 热搜榜
            this.hotSearch = hotSearchRes.data.map(it => ({
                searchWord: it.searchWord,
                content: it.content,
                iconUrl: it.iconUrl
            }));
        }
    }
};
</script>

<style lang="less" scoped>
.top-search {
    padding: 0px 10px;
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
        .cancel {
            font-size: 17px;
            margin-left: 16px;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
    }
    .suggest-list {
        .suggest-item {
            height: 46px;
            display: flex;
            .icon {
                display: flex;
                justify-content: center;
                flex-direction: column;
                img {
                    width: 14px;
                    height: 14px;
                    opacity: 0.8;
                }
            }
            .content {
                margin-left: 6px;
                flex: 1;
                display: flex;
                justify-content: center;
                flex-direction: column;
                border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
            }
        }
    }
    .search-section {
        height: calc(100vh - 110px);
        overflow: hidden auto;
        .module-item {
            .title {
                font-size: 15px;
                margin: 8px 0px;
            }
            .history {
                height: 100px;
            }
            .hot-search {
                display: flex;
                flex-wrap: wrap;
                .hot-search-item {
                    width: 50%;
                    display: flex;
                    padding: 8px 0px;
                    .hot {
                        color: #d43c33;
                        opacity: 1 !important;
                    }
                    .index {
                        width: 25px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;
                        font-size: 16px;
                        opacity: 0.4;
                    }
                    .info {
                        flex: 1;
                        width: 100px;
                        .name {
                            font-size: 14px;
                            margin-bottom: 4px;
                            img {
                                height: 12px;
                                margin-left: 6px;
                            }
                        }
                        .desc {
                            font-size: 10px;
                            opacity: 0.4;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            width: calc(100% - 24px);
                        }
                    }
                }
            }
        }
    }
}
</style>