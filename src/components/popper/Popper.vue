<template>
  <div class="n-popper" ref="triggerRef">
    <slot name="trigger"></slot>
    <teleport to="body">
      <div class="n-popover-container" ref="popperRef">
        <slot></slot>
      </div>
    </teleport>
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeUnmount,
  onDeactivated,
  onActivated,
  onMounted,
  ref,
} from "@vue/runtime-core";
import usePopper from "./popper";
export default defineComponent({
  name: "Popper",
  setup(props, context) {
    const triggerRef = ref(null);
    const popperRef = ref(null);

    const popperStates = usePopper(props, context, triggerRef, popperRef);
    const forceDestroy = () => popperStates.doDestroy(true);

    onMounted(popperStates.initializePopper);
    onActivated(popperStates.initializePopper);
    onBeforeUnmount(forceDestroy);
    onDeactivated(forceDestroy);

    return { triggerRef, popperRef, popperStates };
  },
  emits: [
    "update:visible",
    "after-enter",
    "after-leave",
    "before-enter",
    "before-leave",
  ],
  props: {
    arrowOffset: {
      type: Number,
      default: 5,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    autoClose: {
      type: Number,
      default: 0,
    },
    boundariesPadding: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      default: "",
    },
    class: {
      type: String,
      default: "",
    },
    style: Object,
    hideAfter: {
      type: Number,
      default: 200,
    },
    cutoff: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    effect: {
      type: String,
      default: "dark", // 'dark' | 'light'
    },
    enterable: {
      type: Boolean,
      default: true,
    },
    manualMode: {
      type: Boolean,
      default: false,
    },
    showAfter: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 12,
    },
    placement: {
      type: String,
      default: "bottom",
    },
    popperClass: {
      type: String,
      default: "",
    },
    pure: {
      type: Boolean,
      default: false,
    },
    popperOptions: {
      type: Object,
      default: () => null,
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    strategy: {
      type: String,
      default: "fixed",
    },
    transition: {
      type: String,
      default: "el-fade-in-linear",
    },
    trigger: {
      type: [String, Array],
      default: "hover", // 'click' | 'hover' | 'focus' | 'manual'
    },
    visible: {
      type: Boolean,
      default: undefined,
    },
    stopPopperMouseEvent: {
      type: Boolean,
      default: true,
    },
    gpuAcceleration: {
      type: Boolean,
      default: true,
    },
    fallbackPlacements: {
      type: Array,
      default: [],
    },
  },
});
</script>

<style scoped>
.n-popper {
  cursor: pointer;
}
/* .n-popover-container[data-popper-reference-hidden] {
  visibility: hidden;
  pointer-events: none;
} */
</style>