<template>
  <div class="map-view">
    <div class="header-container">
      <v-header />
    </div>

    <div class="base-map-container">
      <base-map />
    </div>
  </div>
</template>

<script>
import VHeader from "@/components/common/Header";
import BaseMap from "@/components/common/BaseMap";
import border from "@/assets/region";
import mask from "@turf/mask";

export default {
  components: {
    VHeader,
    BaseMap,
  },
  mounted() {
    this.addBorder();
  },
  methods: {
    addBorder() {
      const map = this.$map;
      const masked = mask(border);

      L.geoJSON(masked, {
        style: {
          color: "rgb(26, 47, 101, 0.8)",
          weight: 5,
          stroke: 5,
          fillOpacity: 1,
        },
      }).addTo(map);

      console.log(masked);
    },
  },
};
</script>

<style scoped lang="scss">
.map-view {
  position: absolute;
  width: 100%;
  height: 100%;

  .header-container {
    position: absolute;
    width: 100%;
    height: 60px;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .base-map-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}
</style>
