import base from "@/components/base";

const components = {
    ...base
};

export default Vue => {
    Object.keys(components).forEach(v => {
        Vue.component(v, components[v]);
    });
};
