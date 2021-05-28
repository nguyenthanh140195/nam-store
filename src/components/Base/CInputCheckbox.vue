<template>
  <div :class="['c-input-checkboxs', { block: !inline }]">
    <label
      class="c-input-checkboxs__checkbox"
      v-for="opt in options"
      :key="opt.key || opt"
    >
      <span>{{ opt.label || opt.key || opt }}</span>
      <input
        type="checkbox"
        v-bind="$attrs"
        v-model="checked"
        :value="opt.key || opt.label || opt"
      />
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  name: "CInputCheckbox",
  emits: ["update:modelValue"],
  props: {
    inline: Boolean,
    modelValue: Array,
    options: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    const { emit } = context;
    const checked = ref(props.modelValue == undefined ? [] : props.modelValue);

    watch(checked, () => {
      emit("update:modelValue", checked.value);
      // console.log("[CInputText] checkChange, checked.value);
    });
    watch(
      () => props.modelValue,
      () => {
        if (checked.value !== props.modelValue)
          checked.value = props.modelValue == undefined ? [] : props.modelValue;
      }
    );

    return { checked };
  },
  // created() {
  //   console.log("[CInputCheckbox] created", this);
  // },
};
</script>

<style lang="scss" scope>
.c-input-checkboxs {
  &__checkbox {
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
  &__checkbox {
    padding-left: 35px;
    input ~ .checkmark {
      width: 22px;
      height: 22px;
      border-radius: 5px;
    }
    .checkmark:after {
      width: 3px;
      height: 8px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
.c-input-checkboxs {
  &__checkbox {
    margin-right: 10px;
    margin-bottom: 10px;
    display: inline-block;
  }
}
.c-input-checkboxs.block {
  .c-input-checkboxs__checkbox {
    display: block;
  }
}
</style>