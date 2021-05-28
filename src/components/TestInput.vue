<template>
  <div class="test-input">
    text: {{ text }}
    <CInputText v-model="text" placeholder="text" required />
    <br />
    number: {{ num }}
    <CInputNumber v-model="num" placeholder="number" required />
    <br />
    checkbox: {{ check }}
    <br />
    <CCheck v-model="check" label="Checkbox" />
    <br /><br />
    ckeckList: {{ checkList }}
    <br />
    <CInputCheck v-model="checkList" inline />
    <br />
    picked: {{ picked }}
    <br />
    <CInputRadio v-model="picked" :options="options" />
    <br />
    checked: {{ checked }}
    <br />
    <CInputCheckbox v-model="checked" :options="options" inline />
    <br />
    selected: {{ selected }}
    <br />
    <CSelect v-model="selected" :options="options" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import CCheck from "./Base/CCheck";
import CInputText from "./Base/CInputText";
import CInputNumber from "./Base/CInputNumber";
import CInputCheck from "./Base/CInputCheck";
import CInputRadio from "./Base/CInputRadio";
import CInputCheckbox from "./Base/CInputCheckbox";
import CSelect from "./Base/CSelect";
export default {
  name: "TestInput",
  components: {
    CCheck,
    CInputText,
    CInputCheck,
    CInputRadio,
    CInputCheckbox,
    CInputNumber,
    CSelect,
  },
  data() {
    const options = [
      "Key 0",
      "Label 0",
      { key: "Key 1" },
      { label: "Label 2" },
      { key: "Key 3", label: "Label 3" },
      { key: "Key 4", label: "Label 4", disabled: true },
    ];
    return {
      options,
    };
  },
  setup(props, context) {
    const num = ref();
    const text = ref();
    const check = ref();
    const picked = ref();
    const checked = ref();
    const selected = ref();
    const checkList = ref([
      { key: "Key 1" },
      { label: "Label 2" },
      { key: "Key 3", label: "Label 3" },
      { key: "Key 4", label: "Label 4" },
    ]);

    onMounted(() => {
      setTimeout(() => {
        check.value = true;
        picked.value = "Key 3";
        checked.value = ["Key 3"];
        checkList.value[2].checked = true;
      }, 2000);
    });

    return {
      num,
      text,
      check,
      picked,
      checked,
      selected,
      checkList,
    };
  },
};
</script>

<style lang="scss" scope>
</style>