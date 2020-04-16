<template>
    <input
        class="base-input"
        autocomplete="off"
        :type="inputType"
        :class="inputClass"
        v-model="inputOptions.value"
        :placeholder="inputOptions.placeholder"
        @click="changeType"
    />
</template>

<script>
export default {
    props: {
        inputOptions: {
            type: Object,
            default: () => ({
                value: "",
                type: "text",
                placeholder: "",
                style: ""
            })
        }
    },

    data() {
        return {
            inputType: "text"
        };
    },
    computed: {
        inputClass() {
            let className = "";
            switch (this.inputOptions.style) {
                case "line":
                    className = "line-style";
                    break;
                default:
                    break;
            }
            return className;
        }
    },

    methods: {
        changeType() {
            this.inputType = this.inputOptions.type;
        }
    }
};
</script>

<style lang="less" scoped>
.base-input {
    width: 100%;
    outline: none;
}
.line-style {
    border: 0px;
    border-bottom: 0.5px solid #666666;
    color: #fff;
    font-size: 16px;
    padding: 4px 6px;
    background-color: transparent;
    border-radius: 0px;
}
</style>
