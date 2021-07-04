<template>
  <teleport to="body">
    <transition appear name="t-modal" duration="500">
      <div
        v-if="visible"
        tabindex="0"
        role="dialog"
        class="n-modal"
        aria-modal="true"
        :class="[{ locked }, className]"
        @click="clickOutside"
        @keyup.esc="clickOutside"
      >
        <div class="n-modal__backdrop" @click="clickOutside" />
        <div class="n-modal__content" @click.stop="(f) => f">
          <div class="header">
            <slot name="header">
              <div v-if="title" class="title" v-html="title" />
              <div v-if="title" class="close" @click="clickClose">&Chi;</div>
            </slot>
          </div>
          <div class="body">
            <slot>
              <div v-if="content" class="title" v-html="content" />
            </slot>
          </div>
          <div class="footer">
            <slot name="footer">
              <button class="btn btn-cancel" @click="clickCancel">
                {{ cancelText }}
              </button>
              <button class="btn btn-ok" @click="clickOK">{{ okText }}</button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import Button from "../Button.vue";
export default defineComponent({
  name: "Modal",
  components: { Button },
  emits: ["onClose", "onOK", "onCancel"],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    locked: {
      type: Boolean,
      default: false,
    },
    title: String,
    content: String,
    className: String,
    okText: {
      type: String,
      default: "OK",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
  },
  setup(props, context) {
    const { emit } = context;

    const clickOK = () => {
      emit("onOK");
    };
    const clickCancel = () => {
      emit("onCancel");
    };
    const clickClose = () => {
      emit("onClose");
    };
    const clickOutside = () => {
      if (!props.locked) clickClose();
    };

    return { clickOK, clickCancel, clickClose, clickOutside };
  },
});
</script>

<style lang="scss" scope>
.n-modal {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &__backdrop {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    background: #00000080;
  }
  &__content {
    min-width: 400px;
    max-width: 600px;
    border-radius: 6px;
    position: absolute;
    background: #ffffff;
    border: 1px solid #dddddd;
    .header {
      padding: 20px;
      min-height: 40px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        padding-right: 30px;
      }
      .close {
        border: 0;
        top: 20px;
        right: 20px;
        position: absolute;
        background: transparent;
        &:hover {
          opacity: 0.5;
          cursor: pointer;
        }
      }
    }
    .body {
      padding: 0 20px;
    }
    .footer {
      display: flex;
      padding: 20px;
      align-items: center;
      justify-content: flex-end;
      .btn {
        min-width: 55px;
        margin-left: 8px;
        padding: 5px 10px;
        border-radius: 3px;
        &:hover {
          cursor: pointer;
        }
      }
      .btn.btn-ok {
        color: #ffffff;
        background: #1890ff;
        border: 1px solid #1890ff;
        &:hover {
          background: #0084ff;
          border: 1px solid #0084ff;
        }
      }
      .btn.btn-cancel {
        background: transparent;
        border: 1px solid #00000080;
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
  &.locked {
    .n-modal__content {
      .header {
        .close {
          display: none;
        }
      }
    }
  }
}

.t-modal-enter-active,
.t-modal-leave-active {
  .n-modal__content {
    transition: all 0.5s;
  }
}

.t-modal-enter-to {
  .n-modal__content {
    animation: animationContent 0.5s;
  }
}
.t-modal-leave-to {
  .n-modal__content {
    opacity: 0;
    transform: scale(0.5);
  }
}
@keyframes animationContent {
  0% {
    transform: translate(0px, -50px);
  }
  100% {
    transform: scale(1);
  }
}
</style>