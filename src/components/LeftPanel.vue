<template>
  <div class="left-panel">
    <div class="region-box box">
      <Region />
    </div>
    <div class="region-box box">
      <Region />
    </div>
    <div class="region-box box">
      <Region />
    </div>
  </div>
</template>

<script>
import Region from "@/components/chart/Region";

export default {
  components: {
    Region,
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

  .box {
    flex: 1;
  }

  .chart {
    height: 100%;
  }
}
</style>