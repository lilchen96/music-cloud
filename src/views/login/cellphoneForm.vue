<template>
    <div class="container">
        <div class="form">
            <div class="form-item">
                <baseInput :inputOptions="inputOptions1"></baseInput>
            </div>
            <div class="form-item">
                <baseInput :inputOptions="inputOptions2"></baseInput>
            </div>
            <div class="button">
                <baseButton :btnOptions="btnOptions" @click="login"></baseButton>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputOptions1: {
                value: "",
                type: "text",
                placeholder: "请输入手机号",
                style: "line"
            },
            inputOptions2: {
                value: "",
                type: "password",
                placeholder: "请输入密码",
                style: "line"
            },
            btnOptions: {
                name: "登录"
            }
        };
    },
    methods: {
        login() {
            this.$axios({
                method: "get",
                url: "cellphoneLogin",
                params: {
                    phone: this.inputOptions1.value,
                    password: this.inputOptions2.value
                }
            })
                .then(res => {
                    if (res.data.code === 200) {
                        this.$router.push({
                            name: "main"
                        });
                    }
                })
                .catch(() => {});
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    .form {
        margin-top: 60px;
        .form-item {
            padding: 0px 20px;
            margin-top: 20px;
        }
        .button {
            margin-top: 30px;
            padding: 0px 20px;
            .base-button {
                color: #fff;
                height: 36px;
                background: #d43c33;
            }
        }
    }
}
</style>
