<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>isMobile: {{ $isMobile }}</h3>
  </div>
</template>

<script>
import { toRefs, ref, reactive, computed } from "vue";
import { titleMixin } from "@/helps/mixin";
export default {
  name: "About",
  title: "About",
  mixins: [titleMixin],
  components: {},
  setup() {
    return {};
  },
  created() {
    console.log(this);
  },
};
</script>

<style lang="scss" scope>
</style>
