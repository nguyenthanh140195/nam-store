<template>
  <router-view class="app__wrapper" :class="{ isMobile: $isMobile }" />

  <div v-if="$loading.count.value" class="app__loading">
    <Loading />
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
@import "./assets/style/app.scss";
@import "./assets/style/material.scss";
</style>
