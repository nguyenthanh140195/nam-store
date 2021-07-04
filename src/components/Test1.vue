<template>
  <div class="test1">
    <Button iconLeft="info">Normal</Button>
    <Button type="text">text</Button>
    <Button type="link">link</Button>
    <Button type="primary" iconRight="search">primary</Button>

    <Button @click="openConfirm">confirm</Button>
    <Button @click="setOpen(true)">Open Modal</Button>
    <Button @click="showToast1">Show Toast 1</Button>
    <Button @click="showToast2">Show Toast 2</Button>
    <Modal
      className="myModal"
      title="HEADER"
      :visible="open"
      @onClose="open = false"
    >
      Modal content
    </Modal>
    <br />
    <CountDown :deadline="new Date('2021/06/07')" /> <br />
    <!-- <CountDown deadline="2021-6-7 00:00:00" /> <br/> -->
    <!-- <CountDown second="90061" /> <br/> -->
    <CountDown second="10" />
    <Skeleton :active="true" :loading="true">
      <div>Skeleton</div>
    </Skeleton>
  </div>
</template>

<script>
import { useToast } from "@/toast/toast";
import { useState } from "@/helps/hooks";
import CountDown from "./CountDown";
import Skeleton from "./Skeleton";
import Button from "./Button";
import Modal from "./modal/Modal.vue";
import { confirm } from "./modal/modal";
export default {
  name: "Test1",
  components: { CountDown, Skeleton, Button, Modal },
  setup() {
    const { show, createToast } = useToast();
    const [open, setOpen] = useState(false);
    const showToast1 = () => {
      const content = { title: "TITLE 1", description: "test description 1" };
      show(content);
    };
    const showToast2 = () => {
      const content = { title: "TITLE 2", description: "test description 2" };
      createToast(content);
    };
    return { open, setOpen, showToast1, showToast2 };
  },
  methods: {
    openConfirm() {
      confirm();
    },
  },
  mounted() {},
};
</script>
