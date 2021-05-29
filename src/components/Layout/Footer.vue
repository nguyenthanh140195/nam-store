<script>
export default {
  name: "Footer",
  render(vm, op) {
    return (
      <div class="footer">
        <router-link to="/">Root</router-link> |
        <router-link to="/home">Home</router-link> |
        <router-link to="/profile">Profile</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    );
  },
};
</script>

<style lang="scss" scope>
.footer {
  a {
    color: #2c3e50;
  }
  a:hover {
    font-weight: bold;
  }
  a.router-link-exact-active {
    font-weight: bold;
    color: #42b983;
  }
}
</style>