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
  directives: {
    auth: {
      mounted: function (el, binding, vnode) {
        console.log("[authMixin] v-auth");
        const { value = "No permission", instance: { noPermission } } = binding;
        if (noPermission)
          el.innerHTML = `<div class="no-permission">${value}</div>`;
      }
    }
  },
  data() { return {}; },
  methods: {},
  // mounted() {
  //   console.log("[authMixin] mounted", this);
  // },
}