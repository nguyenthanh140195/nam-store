import { auth } from './directives'
import { isLoggedIn } from '@/utils/auth'

export default {
  computed: {
    noPermission() {
      const { requiresAuth, roles = [] } = this.$route.meta;
      const { checkPermission } = this.$store.getters;
      if (!requiresAuth) return false;
      if (!isLoggedIn()) return true;
      return !checkPermission(roles);
    }
  },
  directives: { auth },
  data() { return {}; },
  methods: {},
  // mounted() {
  //   console.log("[authMixin] mounted", this);
  // },
}