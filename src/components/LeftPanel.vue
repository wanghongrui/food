<template>
  <div class="left-panel">
    <div class="charts-box box" v-if="chartsVisible">
      <Charts />
    </div>

    <div class="detail-box box" v-if="item">
      <Detail />
    </div>
  </div>
</template>

<script>
import Charts from "@/components/chart/Charts";
import Detail from "@/components/common/Detail";

export default {
  components: {
    Charts,
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
  data() {
    return {
      chartsVisible: false,
    };
  },
  mounted() {
    this.$app.$on("open-charts", () => {
      this.chartsVisible = !this.chartsVisible;
    });
  },
};
</script>

<style lang="scss">
.left-panel {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  .box {
    width: 240px;
    box-shadow: inset 0px 0px 6px 2px #09c;
    padding: 12px;
  }

  .charts-box {
    flex: 1;
    overflow: hidden;
  }
}
</style>