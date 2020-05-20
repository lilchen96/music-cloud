<template>
    <div class="">
        <input
            v-if="inputOptions.style === 'line'"
            class="base-input"
            autocomplete="off"
            :type="inputType"
            :class="inputClass"
            v-model="inputOptions.value"
            :placeholder="inputOptions.placeholder"
            @click="changeType"
            @change="inputChange(inputOptions.value)"
        />
        <div v-if="inputOptions.style === 'icon'" class="icon-section">
            <div class="icon"><img class="icon" :src="inputOptions.icon" /></div>
            <input
                class="base-input"
                autocomplete="off"
                :type="inputType"
                :class="inputClass"
                v-model="inputOptions.value"
                :placeholder="inputOptions.placeholder"
                @change="inputChange(inputOptions.value)"
            />
        </div>
    </div>
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
                case "icon":
                    className = "icon-style";
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
        },
        inputChange(value) {
            this.$emit("on-change", value);
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
.icon-section {
    height: 100%;
    display: flex;
    .icon {
        width: 30px;
        padding-left: 10px;
        border-radius: 50px 0 0 50px;
        background-color: #292929;
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            width: 18px;
            height: 18px;
        }
    }
    .icon-style {
        border: 0;
        border-radius: 0 50px 50px 0;
        background-color: #292929;
        color: #fff;
        font-size: 16px;
        padding: 0px 10px;
    }
}
</style>
