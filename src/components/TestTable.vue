<template>
  <div class="test-table">
    sortOrders: {{ table.sortOrders }}
    <br />
    filtered: {{ table.filtered }}
    <CTable
      hover
      striped
      class="custom-table1"
      :page="table.page"
      :size="table.size"
      :columns="table.columns"
      :filtered="table.filtered"
      :totalData="table.totalData"
      :dataSource="table.dataSource"
      :sortOrders="table.sortOrders"
      @isFinished="isFinished"
      @onSortChanged="onSortChanged"
      @onSizeChanged="onSizeChanged"
      @onPageChanged="onPageChanged"
      @onFilterChanged="onFilterChanged"
    />
    <br />
    <br />
    <CTable
      v-slot="{ row }"
      :columns="columns"
      :page="table.page"
      :size="table.size"
      :totalData="table.totalData"
      :dataSource="table.dataSource"
      :sortOrders="table.sortOrders"
      class="custom-table2"
      @onSortChanged="onSortChanged"
      @onSizeChanged="onSizeChanged"
      @onPageChanged="onPageChanged"
    >
      <td
        v-for="column in columns"
        :key="column.key"
        class="custom-table2__row__cel"
      >
        <div :class="column.celClass">
          {{ row[column.key] }}
        </div>
      </td>
    </CTable>
  </div>
</template>

<script>
import { toRefs, ref, reactive, computed, onMounted } from "vue";
import CTable from "./CTable";
const _columns = [
  {
    key: "no",
    width: "5%",
    label: "No",
    align: "center",
    render: (row, { page, index, size }) => (page - 1) * size + index + 1,
  },
  {
    key: "name",
    width: "60%",
    label: "Name",
    sortable: true,
    filterable: true,
    headClass: "col-name",
    celClass: "cel-name",
    render: (row) => row.name,
  },
  {
    key: "power",
    width: "30%",
    label: "Power",
    sortable: true,
    filterable: true,
  },
  {
    key: "action",
    width: "5%",
    label: "",
    align: "center",
    render: (row, { index }) => `<button data-index="${index}">Edit</button>`,
  },
];
const _dataSource = [
  { name: "Chuck Norris", power: Infinity },
  { name: "Bruce Lee", power: 9000 },
  { name: "Jackie Chan", power: 7000 },
  { name: "Jet Li", power: 8000 },
  { name: "Chuck Norris", power: Infinity },
  { name: "Bruce Lee", power: 9000 },
  { name: "Jackie Chan", power: 7000 },
  { name: "Jet Li", power: 8000 },
  { name: "Chuck Norris", power: Infinity },
  { name: "Bruce Lee", power: 9000 },
  { name: "Jackie Chan", power: 7000 },
  { name: "Jet Li", power: 8000 },
  { name: "Bruce Lee", power: 9000 },
  { name: "Jackie Chan", power: 7000 },
  { name: "Jet Li", power: 8000 },
  { name: "Chuck Norris", power: Infinity },
  { name: "Bruce Lee", power: 9000 },
  { name: "Jackie Chan", power: 7000 },
  { name: "Jet Li", power: 8000 },
  { name: "Jackie Chan", power: 7000 },
];
const _columns2 = [
  {
    key: "no",
    width: "5%",
    label: "No",
  },
  {
    key: "name",
    width: "50%",
    label: "Name",
    sortable: true,
    headClass: "col-name",
    celClass: "cel-name",
  },
  {
    key: "power",
    width: "45%",
    label: "Power",
    sortable: true,
  },
];
export default {
  name: "TestTable",
  components: { CTable },
  setup() {
    const columns = ref(_columns2);
    const table = reactive({
      page: 1,
      size: 10,
      totalData: 1,
      filtered: {},
      sortOrders: {},
      columns: [],
      dataSource: [],
    });
    const isFinished = (elements) => {
      // console.log("[TEST] isFinished", elements);
    };
    const onSortChanged = (sort) => {
      table.sortOrders = sort;
      // console.log("[TEST] onSortChanged", sort);
    };
    const onSizeChanged = (size) => {
      table.size = size;
      // console.log("[TEST] onSizeChanged", size);
    };
    const onPageChanged = (page) => {
      table.page = page;
      // console.log("[TEST] onPageChanged", page);
    };
    const onFilterChanged = (filter) => {
      table.filtered = filter;
      // console.log("[TEST] onFilterChanged", filter);
    };
    onMounted(() => {
      table.totalData = 101;
      table.columns = _columns;
      table.dataSource = _dataSource;
    });
    return {
      table,
      columns,
      isFinished,
      onSortChanged,
      onSizeChanged,
      onPageChanged,
      onFilterChanged,
    };
  },
  mounted() {
    // console.log("[TEST] mounted", this);
  },
};
</script>

<style lang="scss" scoped>
.custom-table2 {
  &__row {
    &__cel {
      padding: 5px;
      text-align: left;
      background: #f8f8f8;
    }
  }
}
</style>