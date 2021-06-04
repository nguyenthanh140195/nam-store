<template>
  <router-view class="app__wrapper" :class="{ isMobile: $isMobile }" />

  <Loading />
</template>

<script>
import Loading from "./loading/Loading.vue";
export default {
  name: "App",
  components: { Loading },
};
</script>

<style lang="scss">
@import "./assets/style/normalize.scss";
@import "./assets/style/material.scss";
@import "./assets/style/app.scss";
</style>
