import { reactive, ref } from "@vue/reactivity";
import { computed, onMounted, onUnmounted } from "@vue/runtime-core";

export const useState = initState => {
  const state = typeof initState !== 'object' ? ref(initState) : reactive(initState);

  const setState = newState => {
    if (typeof initState !== typeof newState) return;
    if (typeof initState !== 'object') {
      state.value = newState;
    } else {
      for (let key in newState) {
        state[key] = newState[key];
      }
    }
  };

  return [state, setState];
}

export const useCounter = (initCount = 0) => {
  const count = ref(initCount);

  const set = value => {
    count.value = value;
  }
  const increase = del => {
    count.value += del;
  }
  const decrease = del => {
    count.value -= del;
  }
  const reset = () => {
    count.value = initCount;
  }

  return [count, { increase, decrease, set, reset }];
}

export const useMediaQuery = mediaQuery => {
  const mq = ref(false);

  const mediaQueryList = window.matchMedia(mediaQuery);
  const cb = ({ matches }) => { mq.value = matches };

  const unUse = () => {
    mediaQueryList.removeListener(cb);
  }

  onMounted(() => {
    cb(mediaQueryList);
    mediaQueryList.addListener(cb);
  });

  onUnmounted(() => {
    mediaQueryList.removeListener(cb);
  });

  return [mq, unUse];
}

export const useWindowSize = () => {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const update = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', update);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', update);
  });

  return { width, height };
}
