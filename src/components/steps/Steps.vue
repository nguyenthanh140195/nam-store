<template>
  <div class="n-steps">
    <slot>
      <Step
        v-for="(step, index) in steps"
        :key="step.title || step"
        :active="index === current"
        v-bind="step"
      />
    </slot>
  </div>
</template>

<script>
import Step from "./Step";
export default {
  name: "Steps",
  components: { Step },
  props: {
    steps: {
      type: Array,
      default: [],
    },
    current: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "process", // wait process finish error
    },
    direction: {
      type: String,
      default: "horizontal", // vertical horizontal
    },
  },
};
</script>

<style lang="scss" scope>
</style>