<template>
  <div>
    <table class="c-table" :class="{ hover: hover, striped: striped }">
      <thead>
        <tr class="c-table__head">
          <th
            v-for="column in columns"
            :key="column.key"
            :style="{ width: column.width }"
            :class="['c-table__head__cel', { sort: column.sortable }]"
          >
            <div :class="column.headClass">
              <label>{{ column.label }}</label>
              <span
                @click="setSort(column.key)"
                :class="['arrow', getSort(column.key)]"
              />
            </div>
          </th>
        </tr>
        <tr class="c-table__search" v-if="searchable">
          <th
            v-for="column in columns"
            :key="column.key"
            :class="['c-table__search__cel', { sort: column.sortable }]"
          >
            <div v-if="column.filterable">
              <input
                type="text"
                class="search"
                :value="filtered[column.key]"
                @blur="setFilter(column.key, $event)"
                @keyup.enter="setFilter(column.key, $event)"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="isNoData">
        <tr class="c-table__row">
          <td :colspan="columns.length">
            <div class="c-table__row__no-data">{{ tableInfo.nodataText }}</div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-for="(row, index) in dataSource"
          :key="index"
          class="c-table__row"
        >
          <slot :row="row" :index="index">
            <td
              v-for="column in columns"
              :key="column.key"
              :class="['c-table__row__cel', 'text-' + column.align]"
            >
              <div
                v-if="column.render"
                :class="column.celClass"
                v-html="column.render(row, { index, ...table })"
              />
              <div v-else :class="column.celClass">
                {{ row[column.key] }}
              </div>
            </td>
          </slot>
        </tr>
      </tbody>
      <!-- <tfoot>
        <tr v-for="(row, index) in footers" :key="index" class="c-table__foot">
          <td
            v-for="column in columns"
            :key="column.key"
            class="c-table__foot__cel"
          >
            <div :class="column.footClass">
              {{ row[column.key] }}
            </div>
          </td>
        </tr>
      </tfoot> -->
    </table>
    <CPagination
      v-if="pagination"
      :size="table.size"
      :page="table.page"
      :totalPage="totalPage"
      :sizeOptions="sizeOptions"
      :paginationInfo="tableInfo.paginationInfo"
      @onPageChanged="setPage"
      @onSizeChanged="setSize"
    />
  </div>
</template>

<script>
import { toRefs, ref, reactive, computed, watch, nextTick } from "vue";
import CPagination from "./CPagination";

export default {
  name: "CTable",
  emits: [
    "isFinished",
    "onSortChanged",
    "onSizeChanged",
    "onPageChanged",
    "onFilterChanged",
  ],
  components: { CPagination },
  props: {
    hover: Boolean,
    striped: Boolean,
    headClass: String,
    bodyClass: String,
    columns: {
      required: true,
      type: Array,
      default: [],
    },
    dataSource: {
      required: true,
      type: Array,
      default: [],
    },
    // footers: {
    //   type: Array,
    //   default: [],
    //   // default: _footers,
    // },
    totalData: {
      required: true,
      type: Number,
      default: 1,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    sortOrders: {
      type: Object,
      default: { key: null, value: null },
    },
    filtered: {
      type: Object,
      default: {},
    },
    page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
    sizeOptions: {
      type: Array,
      default: [0, 10, 20, 50],
    },
    tableInfo: {
      type: Object,
      default: {
        nodataText: "No data",
      },
    },
  },
  setup(props, context) {
    const { emit } = context;
    const table = reactive({
      page: props.page,
      size: props.size,
    });
    const isNoData = computed(() => props.dataSource.length === 0);
    const totalPage = computed(() => {
      if (props.size === 0) {
        table.page = 1;
        return 1;
      }
      const total = Math.ceil(props.totalData / props.size);
      table.page = table.page > total ? total : table.page;
      return total;
    });
    const searchable = computed(() =>
      props.columns.some(({ filterable }) => filterable)
    );
    watch(
      () => props.dataSource,
      () => {
        nextTick(function () {
          let elements = document.getElementsByClassName("c-table__row");
          emit("isFinished", elements);
          // console.log("[CTable] isFinished", elements);
        });
      }
    );
    const setSort = (key) => {
      const { sortOrders } = props;
      const value = sortOrders.key !== key ? 1 : -1 * sortOrders.value;
      const newSortOrders = { key, value };
      emit("onSortChanged", newSortOrders);
      // console.log("[CTable] onSortChanged", newSortOrders);
    };
    const getSort = (key) => {
      const { sortOrders } = props;
      if (sortOrders.key !== key || sortOrders.value == undefined) return null;
      return sortOrders.value > 0 ? "asc" : "desc";
    };
    const setPage = (page) => {
      table.page = page;
      emit("onPageChanged", page);
      // console.log("[CTable] onPageChanged", page);
    };
    const setSize = (size) => {
      table.size = size;
      emit("onSizeChanged", size);
      // console.log("[CTable] onSizeChanged", size);
    };
    const setFilter = (key, e) => {
      const { filtered } = props;
      const { value } = e.target;
      if (filtered[key] === value) return;
      const newFiltered = { ...filtered, [key]: value };
      emit("onFilterChanged", newFiltered);
      // console.log("[CTable] onFilterChanged", newFiltered);
    };
    return {
      isNoData,
      totalPage,
      searchable,
      table,
      setSort,
      getSort,
      setSize,
      setPage,
      setFilter,
    };
  },
  mounted() {
    // console.log("[CTable] mounted", this);
  },
};
</script>

<style lang="scss" scope>
$color-odd: #fafafa;
$color-even: #f6f6f6;
$color-hover: #f0f0f0;
$color-row: #abcdef6b;
$color-head: #42b983;
$color-arrow: #ffffff;
$color-border: #42b983;

.c-table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid $color-head;

  &.striped {
    .c-table__row {
      &:nth-child(odd) {
        background-color: $color-odd;
      }
      &:nth-child(even) {
        background-color: $color-even;
      }
    }
  }

  &.hover {
    .c-table__row {
      &:hover {
        background-color: $color-hover;
      }
    }
  }

  &__head__cel,
  &__search__cel,
  &__foot__cel,
  &__row__cel {
    padding: 5px 10px;
  }

  &__head {
    &__cel {
      border: 1px solid $color-border;
      position: relative;
      background-color: $color-head;
      &.sort {
        padding-right: 45px;
        .arrow {
          display: inline-block;
        }
        .arrow.asc::before {
          opacity: 1;
        }
        .arrow.desc::after {
          opacity: 1;
        }
      }

      .arrow {
        display: none;
        cursor: pointer;

        &::before {
          right: 20px;
          bottom: 50%;
          opacity: 0.35;
          position: absolute;
          margin-bottom: 1px;
          content: "";
          border-bottom: 6px solid $color-arrow;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
        }

        &::after {
          top: 50%;
          right: 20px;
          opacity: 0.35;
          position: absolute;
          margin-top: 1px;
          content: "";
          border-top: 6px solid $color-arrow;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
        }
      }
    }
  }
  &__search {
    border: 1px solid $color-border;
    &__cel {
      .search {
        width: 100%;
        padding: 4px 26px 4px 20px;
      }
    }
  }

  &__row {
    border-bottom: 1px solid $color-row;
    &__cel {
      text-align: left;
    }
    &__no-data {
      padding: 10px 20px;
    }
  }

  &__foot {
    border-top: 1px solid $color-border;
    &__cel {
      text-align: left;
    }
  }
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>
