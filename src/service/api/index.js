export default {
    // 接口前都加music
    cellphoneLogin: "/music/login/cellphone", // 手机号登录
    musicDetail: "music/song/detail", // 歌曲详情 get
    getPlaylist: "music/user/playlist", // 获取用户歌单   get
    getPlayRecord: "music/user/record", // 获取用户最近播放   get ?uid=32953014&type=1
    getPlaylistDeatil: "music/playlist/detail", // 获取歌单详情(包括歌曲) get ?id=24381616
    getLikelist: "music/likelist", // 喜欢音乐列表 get ?uid=32953014
    getUserRecord: "music/user/record", // 播放记录 get ?uid=32953014&type=1 type=1 时只返回 weekData, type=0 时返回 allData
    getTopNewAlbum: "music/album/newest", // 最新专辑 get
    getBanner: "music/banner" // 发现轮播图 get ?type=2 0: pc 1: android 2: iphone 3: ipad
};
