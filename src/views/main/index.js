import main from "@/views/main/main.vue";
import mine from "@/views/main/mine/mine.vue";
import discovery from "@/views/main/discovery/discovery.vue";
import functionalPages from "@/views/main/functionalPages";

export default [
    {
        name: "main",
        path: "/main",
        component: main,
        meta: { title: "主页|music-cloud", deepth: 2 },
        children: [
            {
                name: "mine",
                path: "mine",
                component: mine,
                meta: { title: "我的|music-cloud", deepth: 2 }
            },
            {
                name: "discovery",
                path: "discovery",
                component: discovery,
                meta: { title: "发现|music-cloud", deepth: 2 }
            },
            ...functionalPages
        ]
    }
];
