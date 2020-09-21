<template>
  <div class="left-panel">
    <div class="region-box box" v-if="region === '全部'">
      <ChartRegion />
    </div>
    <div class="streets-box box" v-if="region !== '全部'">
      <ChartStreets />
    </div>

    <div class="detail-box box">
      <Detail />
    </div>
  </div>
</template>

<script>
import ChartRegion from "@/components/chart/Region";
import ChartStreets from "@/components/chart/Streets";
import Detail from "@/components/common/Detail";

export default {
  components: {
    ChartRegion,
    ChartStreets,
    Detail,
  },
  computed: {
    item() {
      return this.$store.state.item;
    },
    region() {
      return this.$store.state.region;
    },
  },
};
</script>

<style lang="scss">
.left-panel {
  position: relative;
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;

  .region-box {
    flex: 2;
  }

  .streets-box {
    flex: 3;
  }

  .chart {
    height: 100%;
  }
}
</style>