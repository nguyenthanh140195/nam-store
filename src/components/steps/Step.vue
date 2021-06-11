<template>
  <div class="step">
    <span v-if="icon" class="step__icon"></span>
    <div class="step__title">{{ title }}</div>
    <div v-if="description" v-html="description" class="step__description" />
  </div>
</template>

<script>
export default {
  name: "Step",
  props: {
    icon: String,
    title: String,
    description: String,
  },
};
</script>

<style lang="scss" scope>
</style>