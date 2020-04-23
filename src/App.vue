<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            transitionName: ""
        };
    },
    created() {},
    watch: {
        $route(to, from) {
            if (to.meta.deepth >= from.meta.deepth) {
                this.transitionName = "slide-left";
            }
            if (to.meta.deepth < from.meta.deepth) {
                this.transitionName = "slide-right";
            }
        }
    }
};
</script>

<style lang="less" scoped>
#app {
    width: 100%;
    height: 100%;
}
.slide-left-enter {
    transform: translate(100%, 0);
}
.slide-left-enter-to {
    transform: translate(0, 0);
}
.slide-left-enter-active {
    transition: all 350ms;
}
.slide-right-enter {
    transform: translate(-100%, 0);
}
.slide-right-enter-to {
    transform: translate(0, 0);
}
.slide-right-enter-active {
    transition: all 350ms;
}
</style>
