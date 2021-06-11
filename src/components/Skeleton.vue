<template>
  <div
    v-if="loading"
    class="n-skeleton"
    :class="[{ 'n-skeleton--active': active }, size]"
  >
    <div v-if="image" class="n-skeleton__header">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="n-skeleton__header__image"
        viewBox="0 0 1098 1024"
      >
        <path
          fill="#c4c4c4"
          d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
        />
      </svg>
    </div>
    <div v-if="avatar" class="n-skeleton__header">
      <span class="n-skeleton__header__avatar" />
    </div>
    <div v-if="content" class="n-skeleton__content">
      <h3 class="n-skeleton__content__title" style="width: 38%"></h3>
      <ul class="n-skeleton__content__paragraph">
        <li></li>
        <li></li>
        <li style="width: 61%"></li>
      </ul>
    </div>
  </div>
  <slot v-else />
</template>

<script>
export default {
  name: "Skeleton",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    content: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "", // sm, md, lg, xl, xxl, xxx
    },
  },
  setup(props) {
    return {};
  },
};
</script>

<style lang="scss" scope>
@mixin m-skeleton($duration) {
  overflow: hidden;
  position: relative;
  &::after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    position: absolute;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#ffffff, 0) 0,
      rgba(#ffffff, 0.2) 20%,
      rgba(#ffffff, 0.5) 60%,
      rgba(#ffffff, 0)
    );
    animation: skeleton-loading $duration infinite;
  }
}
.n-skeleton {
  gap: 16px;
  display: flex;
  &__header {
    &__image {
      width: 32px;
      height: 32px;
    }
    &__avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: inline-block;
      background: #d8d8d8;
    }
  }
  &__content {
    flex: auto;
    &__title {
      height: 16px;
      border-radius: 4px;
      margin-bottom: 24px;
      background: #d8d8d8;
    }
    &__paragraph {
      list-style: none;
      li {
        height: 16px;
        margin-top: 12px;
        border-radius: 4px;
        background: #d8d8d8;
      }
    }
  }
  &--active {
    .n-skeleton__header {
      &__avatar {
        @include m-skeleton(1.5s);
      }
    }
    .n-skeleton__content {
      &__title {
        @include m-skeleton(2s);
      }
      &__paragraph {
        li {
          @include m-skeleton(2s);
        }
      }
    }
  }
  &.sm {
    .n-skeleton__header {
      .n-skeleton__header__image,
      .n-skeleton__header__avatar {
        width: 40px;
        height: 40px;
      }
    }
  }
  &.md {
    .n-skeleton__header {
      .n-skeleton__header__image,
      .n-skeleton__header__avatar {
        width: 48px;
        height: 48px;
      }
    }
  }
  &.lg {
    .n-skeleton__header {
      .n-skeleton__header__image,
      .n-skeleton__header__avatar {
        width: 56px;
        height: 56px;
      }
    }
  }
  &.xl {
    .n-skeleton__header {
      .n-skeleton__header__image,
      .n-skeleton__header__avatar {
        width: 64px;
        height: 64px;
      }
    }
  }
  &.xxl {
    .n-skeleton__header {
      .n-skeleton__header__image,
      .n-skeleton__header__avatar {
        width: 72px;
        height: 72px;
      }
    }
  }
  &.xxx {
    .n-skeleton__header {
      .n-skeleton__header__image,
      .n-skeleton__header__avatar {
        width: 80px;
        height: 80px;
      }
    }
  }
}
@keyframes skeleton-loading {
  100% {
    transform: translateX(100%);
  }
}
</style>