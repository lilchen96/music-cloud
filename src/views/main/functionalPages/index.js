import musicList from "@/views/main/functionalPages/musicList/musicList.vue";
import searchResult from "@/views/main/functionalPages/searchResult/searchResult.vue";

export default [
    {
        name: "musicList",
        path: "musicList",
        component: musicList,
        meta: { title: "播放列表|music-cloud", deepth: 3 }
    },
    {
        name: "searchResult",
        path: "searchResult",
        component: searchResult,
        meta: { title: "搜索结果|music-cloud", deepth: 3 }
    }
];
