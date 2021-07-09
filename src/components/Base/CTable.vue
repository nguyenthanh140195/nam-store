<template>
  <div>
    <table class="c-table" :class="{ hover: hover, striped: striped }">
      <thead>
        <tr class="c-table__head">
          <th
            v-for="column in columns"
            :key="column.key"
            :style="{ width: column.width }"
            class="c-table__head__cel"
            :class="[
              'text-' + column.align,
              { sortable: column.sortable },
              { filterable: column.filterable },
            ]"
          >
            <div class="cel-content">
              <label>{{ column.label }}</label>
              <span
                v-if="column.sortable"
                class="sort"
                @click="clickSort(column.key)"
              >
                ±
                <span :class="getSort(column.key)" />
              </span>
              <span v-if="column.filterable" class="filter">
                <span
                  :class="{ filtered: tableState.filtered[column.key].length }"
                  @click="setShowFilterKey(column.key)"
                >
                  @
                </span>
                <span v-if="showFilterKey === column.key" class="popover">
                  <CFilter
                    :options="column.filters"
                    :selected="tableState.filtered[column.key]"
                    @onReset="setFilter(column.key)"
                    @onOk="setFilter(column.key, $event)"
                  />
                </span>
              </span>
            </div>
          </th>
        </tr>
        <tr class="c-table__search" v-if="isSearchable">
          <th
            v-for="column in columns"
            :key="column.key"
            class="c-table__search__cel"
          >
            <div v-if="column.searchable" class="cel-content">
              <input
                type="text"
                class="search"
                :value="searched[column.key]"
                @change="changeSearch(column.key, $event)"
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
          <slot :row="row" :index="index" v-bind="tableState">
            <td
              v-for="column in columns"
              :key="column.key"
              class="c-table__row__cel"
              :class="'text-' + column.align"
            >
              <div
                v-if="column.render"
                class="cel-content"
                v-html="column.render(row, { index, ...tableState })"
              />
              <div v-else class="cel-content">
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
      :page="tableState.page"
      :size="tableState.size"
      @update:page="setPage"
      @update:size="setSize"
      :totalPage="totalPage"
      :sizeOptions="sizeOptions"
      :paginationInfo="tableInfo.paginationInfo"
    />
  </div>
</template>

<script>
import { reactive, computed, watch, nextTick, ref } from "vue";
import CFilter from "./CFilter";
import CPagination from "./CPagination";
const SORT_TYPE = {
  ASC: "asc",
  DESC: "desc",
};

export default {
  name: "CTable",
  emits: [
    "isFinished",
    "tableChange",
    "update:page",
    "update:size",
    "update:sorted",
    "update:searched",
    "update:filtered",
  ],
  components: { CFilter, CPagination },
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
      default: 0,
    },
    pagination: {
      type: Boolean,
      default: true,
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
    forceUpdate: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
    sorted: {
      type: Object,
      default: { key: null, value: null },
    },
    searched: {
      type: Object,
      default: {},
    },
    filtered: {
      type: Object,
      default: {},
    },
  },
  setup(props, context) {
    const { emit } = context;
    const tableState = reactive({
      page: props.page,
      size: props.size,
      sorted: props.sorted,
      filtered: props.filtered,
      searched: props.searched,
    });
    const showFilterKey = ref(null);
    const totalPage = computed(() => {
      if (props.totalData === 0 || tableState.size === 0) {
        tableState.page = 1;
        return 1;
      }
      const total = Math.ceil(props.totalData / tableState.size);
      tableState.page = tableState.page > total ? total : tableState.page;
      return total;
    });
    const isNoData = computed(() => !props.dataSource.length);
    const isSearchable = computed(() =>
      props.columns.some(({ searchable }) => searchable)
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
    watch(
      () => [
        tableState.page,
        tableState.size,
        tableState.sorted,
        tableState.filtered,
        tableState.searched,
      ],
      () => {
        emit("tableChange", { ...tableState });
      }
    );

    const setPage = (page) => {
      tableState.page = page;
      emit("update:page", page);
      // console.log("[CTable] updatePage", page);
    };
    const setSize = (size) => {
      tableState.size = size;
      emit("update:size", size);
      // console.log("[CTable] updateSize", size);
    };
    const setSort = (key, value) => {
      const newSorted = { key, value };
      tableState.sorted = newSorted;
      emit("update:sorted", newSorted);
      // console.log("[CTable] updateSorted", newsorted);
    };
    const setSearch = (key, value) => {
      const { searched } = tableState;
      if (searched[key] === value) return;
      const newSearched = { ...searched, [key]: value };
      tableState.searched = newSearched;
      emit("update:searched", newSearched);
      // console.log("[CTable] updateSearched", newSearched);
    };
    const setFilter = (key, value) => {
      showFilterKey.value = null;
      tableState.filtered[key] = value;
      emit("update:filtered", { ...tableState.filtered });
    };

    const changeSearch = (key, e) => {
      const { value } = e.target;
      setSearch(key, value);
    };
    const clickSort = (key) => {
      const { sorted } = tableState;
      const value =
        sorted.key !== key
          ? SORT_TYPE.ASC
          : sorted.value === SORT_TYPE.ASC
          ? SORT_TYPE.DESC
          : SORT_TYPE.ASC;
      setSort(key, value);
    };
    const getSort = (key) => {
      const { sorted } = tableState;
      if (sorted.key !== key || sorted.value == undefined) return null;
      return sorted.value;
    };
    const setShowFilterKey = (key) => {
      showFilterKey.value = showFilterKey.value === key ? null : key;
    };

    return {
      tableState,
      totalPage,
      isNoData,
      isSearchable,
      showFilterKey,
      setShowFilterKey,
      clickSort,
      changeSearch,
      getSort,
      setPage,
      setSize,
      setSort,
      setSearch,
      setFilter,
    };
  },
  // mounted() {
  //   console.log("[CTable] mounted", this);
  // },
};
</script>

<style lang="scss" scope>
$color-odd: #fafafa;
$color-even: #f6f6f6;
$color-hover: #f0f0f0;
$color-row: #abcdef6b;
$color-head: #42b983;
$color-sort: #ffffff;
$color-border: #42b983;

.c-table {
  width: 100%;
  text-align: left;
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
      .cel-content {
        display: flex;
        label {
          flex: 100%;
        }

        .sort {
          cursor: pointer;
          span {
            &::before {
              right: 20px;
              bottom: 50%;
              opacity: 0.35;
              position: absolute;
              margin-bottom: 1px;
              content: "";
              border-bottom: 6px solid $color-sort;
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
              border-top: 6px solid $color-sort;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
            }
          }
        }
        .filter {
          position: relative;
          .popover {
            z-index: 2;
            position: absolute;
            top: 100%;
            left: auto;
            right: 0;
          }
        }
      }
      &.sortable {
        .cel-content {
          .sort span.asc::before {
            opacity: 1;
          }
          .sort span.desc::after {
            opacity: 1;
          }
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
      text-align: center;
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
