<template>
  <div class="c-input text">
    <label v-if="label" :for="name">{{ label }}</label>
    <input
      type="text"
      v-bind="$attrs"
      :name="name"
      v-model="value"
      @blur="onBlur"
      @change="onChange"
      @keyup.enter="onPressEnter"
    />
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "CInputText",
  emits: ["update:modelValue", "onBlur", "onChange", "onPressEnter"],
  props: {
    name: String,
    label: String,
    modelValue: String,
    modelModifiers: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const { emit } = context;
    const value = computed({
      get: () => props.modelValue,
      set: (val) => {
        let value = val;
        if (props.modelModifiers.capitalize)
          value = value.charAt(0).toUpperCase() + value.slice(1);

        emit("update:modelValue", value);
        // console.log("[CInputText] updateValue", value);
      },
    });

    const _emit = (event, e) => {
      const { value } = e.target;
      if (props.modelValue === value) return;
      emit(event, args);
    };
    const onBlur = (e) => {
      _emit("onBlur", e);
    };
    const onChange = (e) => {
      _emit("onChange", e);
    };
    const onPressEnter = (e) => {
      _emit("onPressEnter", e);
    };

    return { value, onBlur, onChange, onPressEnter };
  },
  // created() {
  //   console.log("[CInputText] created", this);
  // },
};
</script>

<style lang="scss" scope>
.c-input.text {
  input {
    width: 100%;
    min-height: 36px;
    padding: 5px 10px;
  }
}
</style>