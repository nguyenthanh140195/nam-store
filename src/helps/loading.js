import { inject } from 'vue';
import { ref } from "@vue/reactivity";

export const loadingSymbol = Symbol("loading");

export function useLoading() {
  return inject(loadingSymbol);
}

export default {
  install: (app, options) => {
    const count = ref(0);

    const increase = () => {
      count.value += 1;
    }
    const decrease = () => {
      count.value -= 1;
    }

    const loadding = {
      count,
      increase,
      decrease,
    };

    app.provide(loadingSymbol, loadding);
    app.config.globalProperties.$loading = loadding;
  },
}
