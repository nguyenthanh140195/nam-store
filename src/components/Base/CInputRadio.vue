<template>
  <div :class="['c-input-radios', { block: !inline }]">
    <label
      class="c-input-radios__radio"
      v-for="opt in options"
      :key="opt.key || opt"
    >
      <span>{{ opt.label || opt.key || opt }}</span>
      <input
        type="radio"
        v-bind="$attrs"
        v-model="picked"
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
  name: "CInputRadio",
  emits: ["update:modelValue"],
  props: {
    inline: Boolean,
    modelValue: [String, Number, Boolean],
    options: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    const { emit } = context;
    const picked = ref(props.modelValue);

    watch(picked, () => {
      emit("update:modelValue", picked.value);
      // console.log("[CInputRadio] checkChange, picked.value);
    });
    watch(
      () => props.modelValue,
      () => {
        if (picked.value !== props.modelValue) picked.value = props.modelValue;
      }
    );

    return { picked };
  },
  // created() {
  //   console.log("[CInputRadio] created", this);
  // },
};
</script>

<style lang="scss" scope>
.c-input-radios {
  &__radio {
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
  &__radio {
    padding-left: 35px;
    input ~ .checkmark {
      width: 22px;
      height: 22px;
      border-radius: 50%;
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
.c-input-radios {
  &__radio {
    margin-right: 10px;
    margin-bottom: 10px;
    display: inline-block;
  }
}
.c-input-radios.block {
  .c-input-radios__radio {
    display: block;
  }
}
</style>