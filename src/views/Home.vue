<template>
  <div class="home">
    <h1>This is an home page</h1>
    <Table />
  </div>
</template>

<script>
import { toRefs, ref, reactive, computed } from "vue";
import Table from "../components/TestTable";
import { titleMixin } from "@/helps/mixin";
export default {
  name: "Home",
  title: "Home",
  mixins: [titleMixin],
  components: { Table },
  setup() {
    return {};
  },
  mounted() {
    // console.log("[Home] mounted", this.$route);
  },
};
</script>
