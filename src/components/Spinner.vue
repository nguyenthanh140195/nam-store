<template>
  <div v-if="type === 0" class="lds-dual-ring" :style="styleLoading">
    <div :style="styleLoading"></div>
  </div>
  <div v-else-if="type === 1" class="lds-hourglass" :style="styleLoading">
    <div :style="{ 'border-width': 0.5 * width + 'px' }"></div>
  </div>
  <div v-else class="lds-facebook" :style="styleLoading">
    <div :style="styleLoading"></div>
    <div :style="styleLoading"></div>
    <div :style="styleLoading"></div>
    <div :style="styleLoading"></div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "Loading",
  props: {
    type: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 22,
    },
    height: {
      type: Number,
      default: 22,
    },
  },
  setup(props) {
    const styleLoading = computed(() => {
      return { width: props.width + "px", height: props.height + "px" };
    });

    return { styleLoading };
  },
};
</script>

<style lang="scss" scope>
// https://loading.io/css/
// https://loading.io/spinner/

// type 0
.lds-dual-ring {
  display: inline-block;
}
.lds-dual-ring div {
  content: " ";
  display: block;
  border-radius: 50%;
  border: 4px solid #ffffff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.5s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// type 1
.lds-hourglass {
  display: inline-block;
}
.lds-hourglass div {
  content: " ";
  display: block;
  border-radius: 50%;
  border: solid #ffffff;
  border-color: #ffffff transparent #ffffff transparent;
  animation: lds-hourglass 1.5s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}

// type other
.lds-facebook {
  display: flex;
  align-items: center;
  justify-content: center;
}
.lds-facebook div {
  margin: 0 5%;
  background: #ffffff;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  animation-delay: -0.36s;
}
.lds-facebook div:nth-child(2) {
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(3) {
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(4) {
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    transform: scale(1, 1);
  }
  50%,
  100% {
    transform: scale(1, 0.5);
  }
}
</style>