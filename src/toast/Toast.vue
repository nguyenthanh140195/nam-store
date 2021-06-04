<template>
  <transition :name="transitionType" type="animation">
    <div
      v-if="visible"
      class="n-toast"
      @mouseenter="stopTimer"
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeave"
      @touchstart="onTouchStart"
      :style="[style, swipeStyle]"
      :class="toastBackgroundColor ? null : type"
    >
      <div class="n-toast__content-wrapper">
        <span v-if="showIcon" class="n-toast__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="32px"
            width="32px"
          >
            <g v-if="type === 'warning'" fill="#ffffff">
              <path
                d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"
              />
            </g>
            <g v-else-if="type === 'danger'" fill="#ffffff">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"
              />
            </g>
            <g v-else-if="type === 'success'" fill="#ffffff">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"
              />
            </g>
            <g v-else fill="#616161">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
              />
            </g>
          </svg>
        </span>
        <div class="n-toast__content">
          <div class="n-toast__content__text">{{ text }}</div>
          <div
            v-if="description"
            v-html="description"
            class="n-toast__content__description"
          />
        </div>
      </div>
      <div
        v-if="showCloseButton"
        class="n-toast__close-icon"
        @click="onCloseHandler"
      />
      <div
        v-if="!hideProgressBar"
        class="n-toast__progress"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </transition>
</template>

<script>
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import { useTimer, useSwipe, useCustomStyle, useTransitionType } from "./hooks";
export default defineComponent({
  name: "Toast",
  components: {},
  props: {
    onCloseHandler: {
      type: Function,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    offset: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    visible: Boolean,
    text: String,
    description: String,
    toastBackgroundColor: String,
    type: {
      type: String,
      default: "default",
    },
    transition: {
      type: String,
      default: "bounce",
    },
    timeout: {
      type: Number,
      default: 2000,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    },
    swipeClose: {
      type: Boolean,
      default: true,
    },
    hideProgressBar: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { swipedDiff, startSwipeHandler, swipeStyle, cleanUpMove } = useSwipe(
      props.position,
      props.onCloseHandler,
      props.swipeClose
    );
    const { transitionType } = useTransitionType(
      props.position,
      props.transition,
      swipedDiff
    );
    const { start, stop, progress } = useTimer(() => {
      props.onCloseHandler();
    }, props.timeout);
    const style = ref();

    const startTimer = () => {
      if (props.timeout > 0) {
        start();
      }
    };
    const stopTimer = () => {
      if (props.timeout > 0) {
        stop();
      }
    };
    const onMouseLeave = () => {
      cleanUpMove("mousemove");
      startTimer();
    };
    const onMouseDown = (event) => {
      startSwipeHandler(event);
    };
    const onTouchStart = (event) => {
      startSwipeHandler(event);
    };

    watchEffect(() => {
      const { customStyle } = useCustomStyle(
        props.position,
        props.offset,
        props.toastBackgroundColor
      );
      style.value = customStyle.value;
    });
    onMounted(() => {
      startTimer();
    });

    return {
      style,
      transitionType,
      startTimer,
      stopTimer,
      progress,
      onTouchStart,
      onMouseLeave,
      onMouseDown,
      swipeStyle,
    };
  },
});
</script>
