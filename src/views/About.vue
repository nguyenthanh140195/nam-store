<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { titleMixin } from '@/helps/mixin';
export default {
  name: "About",
  title: "About",
  mixins: [titleMixin],
  components: {},
  created(){
    console.log(this);
  }
};
</script>