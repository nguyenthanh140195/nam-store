<template>
  <div v-if="canAccess" class="wrapper">
    <router-view class="wrapper__content" />
    <Footer class="wrapper__footer" />
    <router-view name="helper" class="wrapper__helper" />
  </div>
  <div v-else class="wrapper">
    <div class="wrapper__no-permission">No permission</div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import Footer from "./Footer";
const checkPermission = (pageRoles = [], userRole) => {
  return pageRoles.includes(userRole);
};
export default {
  name: "Layout",
  components: { Footer },
  setup(props) {
    const route = useRoute();

    const { noAuth, roles: pageRoles } = route.meta;
    const permission = checkPermission(pageRoles, "ADMIN");
    const canAccess = noAuth || permission;

    return { canAccess };
  },
};
</script>

<style lang="scss" scope>
.wrapper {
  &__footer {
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

  &__no-permission {
    min-width: 300px;
    max-width: 600px;
    margin: 200px auto;
    text-align: center;
  }
}
</style>