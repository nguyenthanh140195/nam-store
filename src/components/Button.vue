<template>
  <button
    v-bind="$attrs"
    class="n-button"
    :class="[type, { loading }]"
  >
    <div class="content">
      <slot v-if="iconLeft" name="iconLeft">
        <span class="material-icons n-button__icon left">
          {{ iconLeft }}
        </span>
      </slot>

      <span class="n-button__label">
        <slot v-if="!loading">
          {{ label }}
        </slot>
      </span>

      <Spinner v-if="loading" :type="2" />
      <slot v-else-if="iconRight" name="iconRight">
        <span class="material-icons n-button__icon right">
          {{ iconRight }}
        </span>
      </slot>
    </div>
  </button>
</template>

<script>
import Spinner from "./Spinner";
export default {
  name: "Button",
  components: { Spinner },
  props: {
    iconLeft: {
      type: String,
    },
    iconRight: {
      type: String,
    },
    label: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "", // primary danger link text
    },
  },
  setup(props, context) {
    return {};
  },
};
</script>

<style lang="scss" scope>
.n-button {
  .content {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding: 3px 6px;
  }
  &__icon {
    &.left {
    }
    &.right {
    }
  }
  &__label {
  }
  &__loading {
  }
  &.loading {
    cursor: not-allowed;
  }
  &:disabled {
    cursor: not-allowed;
  }
  &:hover {
    cursor: pointer;
  }
  &.primary {
    background: #1890ff;
    border-color: #1890ff;
  }
  &.danger {
    background: #ff1818;
    border-color: #ff1818;
  }
  &.link {
    color: #1890ff;
    background: 0 0;
    border-color: transparent;
  }
  &.text {
    background: 0 0;
    border-color: transparent;
  }
}
</style>
