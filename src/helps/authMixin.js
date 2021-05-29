import { isLoggedIn } from '@/utils/auth'
export default {
  computed: {
    // permission() {
    //   const { requiresAuth, roles = [] } = this.$route.meta;
    //   const { checkPermission } = this.$store.getters;
    //   if (!requiresAuth) return true;
    //   if (!isLoggedIn()) return false;
    //   return checkPermission(roles);
    // },
    noPermission() {
      const { requiresAuth, roles = [] } = this.$route.meta;
      const { checkPermission } = this.$store.getters;
      if (!requiresAuth) return false;
      if (!isLoggedIn()) return true;
      return !checkPermission(roles);
    }
  },
}