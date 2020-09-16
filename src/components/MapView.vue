<template>
  <div class="map-view">
    <div class="base-map-container">
      <base-map />
    </div>
  </div>
</template>

<script>
import BaseMap from "@/components/common/BaseMap";
import border from "@/assets/region";
import mask from "@turf/mask";

export default {
  components: {
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

  .base-map-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
