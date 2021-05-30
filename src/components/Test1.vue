<template>
  <div class="test1">
    <Button iconLeft="info">Normal</Button>
    <Button type="text">text</Button>
    <Button type="link">link</Button>
    <Button type="primary" iconRight="search">primary</Button>

    <Button @click="openModal = true">Open Modal</Button>
    <Modal
      className="myModal"
      title="HEADER"
      :visible="openModal"
      @onClose="openModal = false"
    >
      Modal content
    </Modal>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Button from "./Button";
import Modal from "./Modal";
export default {
  name: "Test1",
  components: { Button, Modal },
  setup() {
    const openModal = ref(false);
    return { openModal };
  },
};
</script>
