<script>
import Footer from "./Footer";
export default {
  name: "Layout",
  components: { Footer },
  render() {
    return (
      <div class="wrapper">
        <router-view class="wrapper__content" />
        <Footer class="wrapper__footer" />
        <router-view name="helper" class="wrapper__helper" />
      </div>
    );
  },
  // created() {
  //   console.log("[Layout Footer] created", this);
  // },
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
}
</style>