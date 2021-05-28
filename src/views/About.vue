<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>isMobile: {{ $isMobile }}</h3>
    <span class="material-icons  md-18">computer</span>
    <span class="material-icons  md-48">smartphone</span>
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
  // created() {
  //   console.log("[About] mounted", this);
  // },
};
</script>

<style lang="scss" scope>
</style>
