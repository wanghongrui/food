<template>
  <div class="map-view">
    <div class="header-container">
      <v-header />
    </div>

    <div class="body-container">
      <div class="left-panel-container">
        <left-panel />
      </div>

      <div class="base-map-container">
        <base-map />
      </div>

      <div class="right-panel-container">
        <right-panel />
      </div>
    </div>
  </div>
</template>

<script>
import VHeader from "@/components/common/Header";
import BaseMap from "@/components/common/BaseMap";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import border from "@/assets/region";
import mask from "@turf/mask";
import bbox from "@turf/bbox";

let map = null;

export default {
  components: {
    VHeader,
    BaseMap,
    LeftPanel,
    RightPanel,
  },
  computed: {
    item() {
      return this.$store.state.item;
    },
    region() {
      return this.$store.state.region;
    },
  },
  mounted() {
    map = this.$map;
    this.setBorder();
    this.addData();
  },
  watch: {
    item() {
      this.location();
    },
    region() {
      this.setBorder();
    },
  },
  methods: {
    setBorder() {
      this.border && this.border.remove();

      let target = border;

      if (this.region !== "全部") {
        target = border.features.find((f) => f.properties.name === this.region);
      }
      const masked = mask(target);

      this.border = L.geoJSON(masked, {
        style: {
          color: "rgb(26, 47, 101, 0.8)",
          weight: 5,
          stroke: 5,
          fillOpacity: 1,
        },
      }).addTo(map);

      this.fitBounds(target);
    },
    addData() {
      fetch("./data/富力.geojson")
        .then((resp) => resp.json())
        .then((geojson) => {
          L.geoJSON(geojson).addTo(map);

          this.$store.commit("items_changed", geojson.features);
        });
    },
    location() {
      this.fitBounds(this.item);
    },
    fitBounds(feature) {
      const [x0, y0, x1, y1] = bbox(feature);
      map.fitBounds(
        [
          [y0, x0],
          [y1, x1],
        ],
        { maxZoom: 17 }
      );
    },
  },
};
</script>

<style scoped lang="scss">
.map-view {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header-container {
    position: relative;
    width: 100%;
    height: 40px;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .body-container {
    flex: 1;
    display: flex;
    padding-top: 10px;
    overflow: hidden;
  }

  .base-map-container {
    position: relative;
    flex: 1;
    height: 100%;
    z-index: 0;
    margin: 0 10px;
  }

  .left-panel-container {
    position: relative;
    width: 280px;
    max-width: 30%;
    height: 100%;
    z-index: 1;
    box-shadow: inset 0px 0px 6px 2px #09c;
  }

  .right-panel-container {
    position: relative;
    width: 280px;
    max-width: 30%;
    height: 100%;
    z-index: 1;
    box-shadow: inset 0px 0px 6px 2px #09c;
  }
}
</style>
