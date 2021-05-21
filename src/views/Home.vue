<template>
  <div class="home">
    <h1>This is an home page</h1>
    <h1>isMobile: {{ $isMobile }}</h1>
  </div>
</template>

<script>
import { titleMixin } from '@/helps/mixin';
export default {
  name: "Home",
  title: 'Home',
  mixins: [titleMixin],
  components: {},
  mounted() {
    console.log(this.$route);
  },
};
</script>
