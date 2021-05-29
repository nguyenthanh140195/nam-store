<template>
  <div class="wrapper">
    <Header class="wrapper__header" />
    <router-view class="wrapper__content" />
    <router-view name="helper" class="wrapper__helper" />
  </div>
</template>

<script>
import Header from "./Header";
export default {
  name: "Layout",
  components: { Header },
  // created() {
  //   console.log("[Layout Header] created", this);
  // },
};
</script>

<style lang="scss" scope>
.wrapper {
  &__header {
    height: 60px;
    padding: 20px;
  }

  &__content {
    padding: 20px;
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100vh - 60px);
  }

  &__helper {
    position: absolute;
  }
}
</style>