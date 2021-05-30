<template>
  <div v-auth="'No permission'" class="profile">Profile page</div>
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