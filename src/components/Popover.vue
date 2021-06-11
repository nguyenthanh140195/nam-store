<template>
  <div class="n-popover" :class="{ 'n-popover--open': open }">
    <slot
      name="trigger"
      @click="onClick"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      class="n-popover__trigger"
    ></slot>
    <teleport to="body">
      <transition name="t-popover">
        <div class="n-popover-container">
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { useState } from "@/helps/hooks";
export default {
  name: "Popover",
  props: {
    trigger: {
      type: String,
      default: "hover",
    },
  },
  setup(props) {
    const [open, setOpen] = useState(false);

    const onClick = (e) => {
      if (props.trigger !== "click") return;
      setOpen(!open);
    };
    const onMouseEnter = (e) => {
      if (props.trigger === "click") return;
      setOpen(true);
    };
    const onMouseLeave = (e) => {
      if (props.trigger === "click") return;
      setOpen(false);
    };

    return { open, setOpen, onClick, onMouseEnter, onMouseLeave };
  },
};
</script>

<style lang="scss" scope>
</style>