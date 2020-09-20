<template>
  <div class="left-panel">
    <div class="region-box box">
      <Region />
    </div>
    <div class="region-box box">
      <Region />
    </div>
    <div class="region-box box" v-if="!item">
      <Region />
    </div>

    <div class="detail-box box" v-if="item">
      <Detail />
    </div>
  </div>
</template>

<script>
import Region from "@/components/chart/Region";
import Detail from "@/components/common/Detail";

export default {
  components: {
    Region,
    Detail,
  },
  computed: {
    item() {
      return this.$store.state.item;
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

  .box {
    flex: 1;
  }

  .chart {
    height: 100%;
  }
}
</style>