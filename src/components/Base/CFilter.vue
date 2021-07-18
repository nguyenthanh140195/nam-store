<template>
  <div class="filter-popup">
    <label v-for="op in options" :key="op.value || op" class="filter__option">
      {{ op.label || op }}
      <input type="checkbox" :value="op.value || op" v-model="checked" />
      <span class="checkmark" />
    </label>
    <div class="filter__action">
      <button @click="clickOk" :disabled="okDisabled">Ok</button>
      <button @click="clickReset" :disabled="resetDisabled">Reset</button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
export default {
  name: "CFilter",
  emits: ["onOk", "onReset", "update:selected"],
  setup(props, context) {
    const { emit } = context;
    const checked = ref(props.selected);

    const clickOk = () => {
      emit("onOk", [...checked.value]);
    };
    const clickReset = () => {
      checked.value = [];
      emit("onReset");
    };

    const okDisabled = ref(true);
    const resetDisabled = computed(() => {
      return !checked.value.length;
    });
    watch(
      () => checked.value,
      () => {
        okDisabled.value = false;
      }
    );

    return { checked, okDisabled, resetDisabled, clickOk, clickReset };
  },
  props: {
    selected: {
      type: Array,
      default: [],
    },
    options: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
.filter-popup {
  display: inline-block;
}

.filter__option {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.filter__option input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

.filter__option:hover input ~ .checkmark {
  background-color: #ccc;
}

.filter__option input:checked ~ .checkmark {
  background-color: #2196f3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.filter__option input:checked ~ .checkmark:after {
  display: block;
}

.filter__option .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>