<template>
  <div class="wrapper">
    <Test1 />
  </div>
</template>

<script>
import Test1 from "../components/Test1";
export default {
  name: "Login",
  components: { Test1 },
  created() {
    console.log("[Login] mounted", this);
  },
};
</script>

<style lang="scss" scope>
</style>