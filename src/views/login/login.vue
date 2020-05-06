<template>
    <div class="container">
        <div class="logo"></div>
        <div class="content">
            <div class="button login">
                <baseButton :btnOptions="btnOptions1" @click="cellPhoneLogin"></baseButton>
            </div>
            <div class="button experience">
                <baseButton :btnOptions="btnOptions2" @click="experience"></baseButton>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            btnOptions1: {
                name: "手机号登录"
            },
            btnOptions2: {
                name: "立即体验"
            }
        };
    },
    methods: {
        cellPhoneLogin() {
            this.$router.push({
                name: "cellphoneForm"
            });
        },
        experience() {}
    }
};
</script>

<style lang="less" scoped>
.container {
    background: #d43c33;
    .logo {
        height: 60%;
    }
    .content {
        flex: 1;
    }
    .button {
        padding: 0px 40px;
        margin-top: 16px;
        .base-button {
            border: 1px solid #fff;
        }
    }
    .login {
        .base-button {
            color: #d43c33;
            background-color: #fff;
        }
    }
    .experience {
        .base-button {
            color: #fff;
            background-color: #d43c33;
        }
    }
}
</style>
