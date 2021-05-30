<template>
  <div class="c-pagination">
    <div class="c-pagination__col left">
      <!-- <span class="page__des">{{ paginationInfo.pageText }}</span> -->
      <select :value="page" @change="setPage($event.target.value)">
        <option v-for="n in totalPage" :key="n" :value="n">
          {{ n }}
        </option>
      </select>
    </div>
    <div class="c-pagination__col mid">
      <span class="page__des">{{ paginationInfo.sizeText }}</span>
      <select :value="size" @change="setSize($event.target.value)">
        <option v-for="op in sizeOptions" :key="op" :value="op">
          {{ op || "ALL" }}
        </option>
      </select>
    </div>
    <div class="c-pagination__col right">
      <button class="page__link" @click="setPage(1)" :disabled="page <= 1">
        <span aria-hidden="true">&laquo;</span>
      </button>
      <button
        class="page__link"
        v-for="p in pageShow"
        :key="p"
        @click="setPage(p)"
        :disabled="page == p"
      >
        <span>{{ p }}</span>
      </button>
      <button
        class="page__link"
        @click="setPage(totalPage)"
        :disabled="page >= totalPage"
      >
        <span aria-hidden="true">&raquo;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { toRefs, ref, reactive, computed } from "vue";
export default {
  name: "CPagination",
  emits: ["update:page", "update:size"],
  props: {
    page: {
      required: true,
      type: Number,
      default: 1,
    },
    size: {
      required: true,
      type: Number,
      default: 10,
    },
    sizeOptions: {
      required: true,
      type: Array,
      default: [0, 10, 20, 50],
    },
    totalPage: {
      required: true,
      type: Number,
      default: 1,
    },
    paginationInfo: {
      type: Object,
      default: {
        pageText: "Current page",
        sizeText: "Rows per page",
      },
    },
  },
  setup(props, context) {
    const { emit } = context;
    const pagination = reactive({});
    const pageShow = computed(() => {
      const { page, totalPage } = props;
      let pages = [],
        startPage = page - 2 <= 0 ? 1 : page - 2;
      if (totalPage - page <= 2)
        startPage = totalPage - 4 <= 0 ? 1 : totalPage - 4;

      for (let i = startPage; i <= totalPage && i < startPage + 5; i++) {
        pages.push(i);
      }
      return pages;
    });

    const setPage = (page) => {
      emit("update:page", +page);
      // console.log("[CPagination] updatePage", +page);
    };
    const setSize = (size) => {
      emit("update:size", +size);
      // console.log("[CPagination] updateSize", +size);
    };

    return { pagination, pageShow, setPage, setSize };
  },
};
</script>

<style lang="scss" scope>
.c-pagination {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  &__col {
    display: flex;
    margin-bottom: 5px;
    &.left {
      width: 25%;
      justify-content: flex-start;
    }
    &.mid {
      width: 25%;
      justify-content: center;
    }
    &.right {
      width: 50%;
      justify-content: flex-end;
    }
    .page__des {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 6px;
    }
    .page__link {
      padding: 3px 6px;
      margin-left: 5px;
      &:disabled {
        cursor: not-allowed;
      }
      &:hover {
        cursor: pointer;
      }
    }
    select {
      padding: 3px 0;
    }
  }
}

@media only screen and (max-width: 480px) {
  .c-pagination {
    &__col {
      &.left {
        width: 50%;
      }
      &.mid {
        width: 50%;
        justify-content: flex-end;
      }
      &.right {
        width: 100%;
      }
    }
  }
}
</style>