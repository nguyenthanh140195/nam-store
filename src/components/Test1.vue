<template>
  <div class="test1">
    <Button iconLeft="info">Normal</Button>
    <Button type="text">text</Button>
    <Button type="link">link</Button>
    <Button type="primary" iconRight="search">primary</Button>

    <Button @click="openModal = true">Open Modal</Button>
    <Button @click="showToast1">Show Toast 1</Button>
    <Button @click="showToast2">Show Toast 2</Button>
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
import { useToast } from "@/toast/toast";
import Button from "./Button";
import Modal from "./Modal";
export default {
  name: "Test1",
  components: { Button, Modal },
  setup() {
    const { show, createToast } = useToast();
    const openModal = ref(false);
    const showToast1 = () => {
      const content = { title: "TITLE 1", description: "test description 1" };
      show(content);
    };
    const showToast2 = () => {
      const content = { title: "TITLE 2", description: "test description 2" };
      createToast(content);
    };
    return { openModal, showToast1, showToast2 };
  },
};
</script>
