<template>
  <div :class="['c-input-checks', { block: !inline }]">
    <CCheck
      v-for="(opt, ind) in modelValue"
      :key="opt.key || opt.label"
      class="c-input-checks__check"
      :label="opt.label || opt.key"
      :modelValue="modelValue[ind].checked"
      @update:modelValue="updateValue(ind, $event)"
    />
  </div>
</template>

<script>
import CCheck from "./CCheck";
export default {
  name: "CInputCheck",
  emits: ["update:modelValue", "change"],
  components: { CCheck },
  props: {
    inline: Boolean,
    modelValue: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    const { emit } = context;
    const updateValue = (index, checked) => {
      const newValue = [...props.modelValue];
      const newItem = { ...newValue[index], checked };
      newValue[index] = newItem;
      emit("change", index, checked);
      emit("update:modelValue", newValue);
    };

    return { updateValue };
  },
  // created() {
  //   console.log("[CInputCheck] created", this);
  // },
};
</script>

<style lang="scss" scope>
.c-input-checks {
  &__check {
    margin-right: 10px;
    margin-bottom: 10px;
    display: inline-block;
  }
}
.c-input-checks.block {
  .c-input-checks__check {
    display: block;
  }
}
</style>