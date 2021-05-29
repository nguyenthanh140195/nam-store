<template>
  <div v-if="noPermission" class="profile">
    <div class="no-permission">No permission</div>
  </div>
  <div v-else class="profile"></div>
</template>

<script>
import authMixin from "../helps/authMixin";
export default {
  name: "Profile",
  mixins: [authMixin],
  // created() {
  //   console.log("[Profile] mounted", this);
  // },
};
</script>

<style lang="scss" scope>
</style>