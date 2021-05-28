<template>
  <div class="header">
    <router-link to="/home">Home</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scope>
.header {
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