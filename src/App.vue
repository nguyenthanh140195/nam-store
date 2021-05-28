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
@import "./material.scss";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app__wrapper {
  width: 100vw;
  height: 100vh;
  color: #2c3e50;
  overflow: hidden;
}

.app__loading {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  background: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
