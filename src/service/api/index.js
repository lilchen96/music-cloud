export default {
    // 接口前都加music
    cellphoneLogin: "/music/login/cellphone", // 手机号登录
    musicDetail: "/music/song/detail", // 歌曲详情 get
    getPlaylist: "/music/user/playlist", // 获取用户歌单   get
    getPlayRecord: "/music/user/record", // 获取用户最近播放   get ?uid=32953014&type=1
    getPlaylistDeatil: "/music/playlist/detail", // 获取歌单详情(包括歌曲) get ?id=24381616
    getLikelist: "/music/likelist", // 喜欢音乐列表 get ?uid=32953014
    getUserRecord: "/music/user/record", // 播放记录 get ?uid=32953014&type=1 type=1 时只返回 weekData, type=0 时返回 allData
    getBanner: "/music/banner", // 发现轮播图 get ?type=2 0: pc 1: android 2: iphone 3: ipad
    getSearchList: "/music/search", // 搜索 ?keywords= 海阔天空?limit offset type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    getSearchDefault: "/music/search/default", // 获取搜索关键字
    getSearchSuggest: "/music/search/suggest", // 搜索建议 ?keywords= 海阔天空
    getHotSearch: "/music/search/hot/detail" // 热搜列表(简略)
};
