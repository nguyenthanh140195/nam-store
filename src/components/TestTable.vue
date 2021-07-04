<template>
  <div class="test-table">
    <Popper>
      <template v-slot:trigger>
        <div>Hover</div>
      </template>
      <div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
    </Popper>
    <br />
    sorted: {{ table.sorted }}
    <br />
    filtered: {{ table.filtered }}
    <CTable
      hover
      striped
      class="custom-table1"
      v-model:page="table.page"
      v-model:size="table.size"
      v-model:sorted="table.sorted"
      v-model:filtered="table.filtered"
      :columns="table.columns"
      :totalData="table.totalData"
      :dataSource="table.dataSource"
      @isFinished="isFinished"
    />
    <br />
    <br />
    <CTable
      v-slot="{ row, index, page, size }"
      :page="table.page"
      :size="table.size"
      :sorted="table.sorted"
      @update:page="updatePage"
      @update:size="updateSize"
      @update:sorted="updateSorted"
      :columns="columns"
      :totalData="table.totalData"
      :dataSource="table.dataSource"
      class="custom-table2"
    >
      <td
        v-for="column in columns"
        :key="column.key"
        class="custom-table2__row__cel"
      >
        <div v-if="column.key === 'no'" class="align-center">
          {{ (page - 1) * size + index + 1 }}
        </div>
        <div v-else :class="column.celClass">
          {{ row[column.key] }}
        </div>
      </td>
    </CTable>
  </div>
</template>

<script>
import { toRefs, ref, reactive, computed, onMounted } from "vue";
import CTable from "./Base/CTable";
import Popper from "./popper/Popper.vue";
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
  components: { CTable, Popper },
  setup() {
    const columns = ref(_columns2);
    const table = reactive({
      page: 1,
      size: 10,
      sorted: {},
      filtered: {},
      totalData: 0,
      columns: [],
      dataSource: [],
    });

    const isFinished = (elements) => {
      // console.log("[TEST] isFinished", elements);
    };
    const updatePage = (page) => {
      table.page = page;
      // console.log("[TEST] updatePage", page);
    };
    const updateSize = (size) => {
      table.size = size;
      // console.log("[TEST] updateSize", size);
    };
    const updateSorted = (sort) => {
      table.sorted = sort;
      // console.log("[TEST] updateSorted", sort);
    };
    const updateFiltered = (filter) => {
      table.filtered = filter;
      // console.log("[TEST] updateFiltered", filter);
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
      updateSorted,
      updateSize,
      updatePage,
      updateFiltered,
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
      .align-center {
        text-align: center;
      }
    }
  }
}
</style>