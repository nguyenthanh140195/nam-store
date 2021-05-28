<template>
  <div class="c-input number">
    <label v-if="label" :for="name">{{ label }}</label>
    <input
      type="number"
      v-bind="$attrs"
      :name="name"
      v-model.number="value"
      @blur="$emit('onBlur', +$event.target.value)"
      @keyup.enter="$emit('onPressEnter', +$event.target.value)"
    />
    <button class="key-up" @click="keyUp">&#9650;</button>
    <button class="key-down" @click="keyDown">&#9660;</button>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "CInputNumber",
  emits: ["update:modelValue", "onBlur", "onPressEnter"],
  props: {
    name: String,
    label: String,
    modelValue: Number,
  },
  setup(props, context) {
    const { emit } = context;
    const value = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit("update:modelValue", +val);
        // console.log("[CInputNumber] input", +val);
      },
    });

    const keyUp = (e) => {
      const number = !props.modelValue ? 1 : +props.modelValue + 1;
      emit("update:modelValue", number);
      // console.log("[CInputNumber] keyupUp", number);
    };
    const keyDown = (e) => {
      const number = !props.modelValue ? -1 : +props.modelValue - 1;
      emit("update:modelValue", number);
      // console.log("[CInputNumber] keyupDown", number);
    };

    return { value, keyUp, keyDown };
  },
  // created() {
  //   console.log("[CInputNumber] created", this);
  // },
};
</script>

<style lang="scss" scope>
.c-input.number {
  position: relative;
  input {
    width: 100%;
    min-height: 36px;
    padding: 5px 30px 5px 10px;
  }

  .key-up,
  .key-down {
    right: 0;
    height: 46%;
    line-height: 1;
    max-height: 20px;
    position: absolute;
    opacity: 0;
    visibility: hidden;
    border: none;
    padding: 0 10px;
    cursor: pointer;
    background: transparent;
  }
  .key-up {
    bottom: 50%;
    // transform: translate(0, -1px);
  }
  .key-down {
    top: 50%;
    // transform: translate(0, 1px);
  }

  &:hover {
    .key-up,
    .key-down {
      opacity: 0.5;
      visibility: unset;
    }
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>