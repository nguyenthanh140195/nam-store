<template>
  <div class="test1">
    <Button iconLeft="info">Normal</Button>
    <Button type="text">text</Button>
    <Button type="link">link</Button>
    <Button type="primary" iconRight="search">primary</Button>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "Test1",
  components: { Button },
};
</script>
