import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

export const useState = initState => {
  const state = typeof initState === 'object' ? reactive(initState) : ref(initState);
  const setState = newState => state.value = newState
  return [state, setState]
}
