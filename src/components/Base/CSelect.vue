<template>
  <div class="c-select">
    <label v-if="label" :for="name">{{ label }}</label>
    <select v-model="selected" v-bind="$attrs">
      <option v-if="!options.length" class="c-select__option" disabled>
        No options
      </option>
      <template v-else>
        <option
          class="c-select__option"
          v-for="opt in options"
          :key="opt.key || opt"
          :disabled="opt.disabled"
          :value="opt.key || opt.label || opt"
        >
          {{ opt.label || opt.key || opt }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  name: "CSelect",
  emits: ["update:modelValue"],
  props: {
    label: String,
    modelValue: Array,
    options: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    const { emit } = context;
    const selected = ref();

    watch(selected, () => {
      emit("update:modelValue", selected.value);
      // console.log("[CSelect] selectChange, selected.value);
    });
    watch(
      () => props.modelValue,
      () => {
        if (selected.value !== props.modelValue)
          selected.value = props.modelValue;
      }
    );

    return { selected };
  },
  // created() {
  //   console.log("[CSelect] created", this);
  // },
};
</script>

<style lang="scss" scope>
.c-select {
  position: relative;
  select {
    width: 100%;
    outline: none;
    cursor: inherit;
    min-height: 36px;
    padding: 5px 30px 5px 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;

    &::-ms-expand {
      display: none;
    }
  }
  &__options {
    padding: 3px 6px;
    background: #ffffff;
  }
  &::after {
    top: 50%;
    right: 10px;
    position: absolute;
    transform: translate(0, -50%);
    content: "";
    width: 10px;
    height: 10px;
    background-color: #000;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
}
</style>