<template>
  <label class="c-check">
    <span>{{ label }}</span>
    <input type="checkbox" v-bind="$attrs" v-model="checked" />
    <span class="checkmark"></span>
  </label>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  name: "CCheck",
  emits: ["update:modelValue"],
  props: {
    label: String,
    modelValue: { type: Boolean, default: false },
  },
  setup(props, context) {
    const { emit } = context;
    const checked = ref(props.modelValue);

    watch(checked, () => {
      emit("update:modelValue", checked.value);
      // console.log("[CCheck] checkChange, checked.value);
    });

    watch(
      () => props.modelValue,
      () => {
        if (checked.value !== props.modelValue)
          checked.value = props.modelValue;
      }
    );

    return { checked };
  },
  // created() {
  //   console.log("[CCheck] created", this);
  // },
};
</script>

<style lang="scss" scope>
.c-check {
  cursor: pointer;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    height: 0;
    width: 0;
  }
  input ~ .checkmark {
    top: 0;
    left: 0;
    position: absolute;
    background-color: #eeeeee;
    border: 1px solid transparent;
  }
  input:checked ~ .checkmark {
    background-color: #2196f3;
  }
  input:focus ~ .checkmark {
    border: 1px solid #4e4e4e;
  }
  input ~ .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 8px;
    top: 4px;
  }
  input:checked ~ .checkmark:after {
    display: block;
  }
  &:hover {
    input ~ .checkmark {
      background-color: #d3cfcf;
      border: 1px solid #4e4e4e;
    }
    input:checked ~ .checkmark {
      background-color: #5faeee;
    }
  }
}

.c-check {
  padding-left: 35px;
  input ~ .checkmark {
    width: 22px;
    height: 22px;
    border-radius: 3px;
  }
  .checkmark:after {
    width: 2px;
    height: 7px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
</style>