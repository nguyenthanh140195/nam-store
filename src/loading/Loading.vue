<template>
  <teleport to="body">
    <div v-if="$loading.count.value" id="app-loading">
      <Spinner :type="1" :width="68" :height="68" />
    </div>
  </teleport>
</template>

<script>
import Spinner from "../components/Spinner";
export default {
  name: "Loading",
  components: { Spinner },
};
</script>

<style lang="scss">
#app-loading {
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