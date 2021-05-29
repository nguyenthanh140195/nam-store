<template>
  <router-view class="app__wrapper" :class="{ isMobile: $isMobile }" />

  <div v-if="$loading.count.value" class="app__loading">
    <Loading :type="1" :width="64" :height="64" />
  </div>
</template>

<script>
import Loading from "./components/Loading";
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
