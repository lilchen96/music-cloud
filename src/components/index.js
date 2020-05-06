import base from "@/components/base";
import topTitle from "@/components/topTitle";

const components = {
    ...base,
    topTitle
};

export default Vue => {
    Object.keys(components).forEach(v => {
        Vue.component(v, components[v]);
    });
};
