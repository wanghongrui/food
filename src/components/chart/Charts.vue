<template>
  <div class="charts">
    <div class="charts-head">
      <span class="charts-head-title">五区餐饮统计</span>
      <span class="charts-head-icon" @click="openCharts">
        <icon name="close" scale="1.2" />
      </span>
    </div>

    <vue-scroll>
      <div class="charts-body">
        <div class="chart-box">
          <ChartRegion />
        </div>
        <div class="chart-box">
          <ChartRoad v-if="region !== '全部'" />
        </div>
        <div class="chart-box">
          <ChartStreets v-if="region !== '全部'" />
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import ChartRegion from "@/components/chart/Region";
import ChartStreets from "@/components/chart/Streets";
import ChartRoad from "@/components/chart/Road";

export default {
  components: {
    ChartRegion,
    ChartStreets,
    ChartRoad,
  },
  computed: {
    item() {
      return this.$store.state.item;
    },
    region() {
      return this.$store.state.region;
    },
  },
  methods: {
    openCharts() {
      this.$app.$emit("open-charts");
    },
  },
};
</script>

<style lang="scss">
.charts {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  &-head {
    display: flex;

    &-title {
      flex: 1;
      font-size: 1.1rem;
    }

    &-icon {
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  &-body {
    flex: 1;
    overflow-y: auto;
  }

  .chart-box {
    height: 300px;
  }

  .chart {
    height: 100%;
  }
}
</style>