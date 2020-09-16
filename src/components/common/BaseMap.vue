<template>
  <div class="base-map">
    <div id="base-map"></div>
    <div class="map-tool-container">
      <map-tool />
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import Vue from "vue";
import MapTool from "@/components/common/MapTool";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    MapTool
  },
  mounted() {
    const map = L.map("base-map", {
      center: [30.275, 120.177],
      zoom: 17,
      crs: L.CRS.EPSG4326,
      attributionControl: false,
      zoomControl: false,
      closePopupOnClick: false
    });

    window.map = map

    Vue.prototype.$map = map;

    let bounds = L.latLngBounds([29.627, 119.476], [30.958, 121.006]);

    if (this.$store.state.isMobile) {
      bounds = bounds.pad(-0.2)
    }

    map.fitBounds(bounds);

    this.$store.commit("map_loaded");

    this.$app.$on("add-layer", opt => {
      this.addLayer(opt);
    });

    this.$app.$on("remove-layer", id => {
      this.removeLayer(id);
    });
  },
  methods: {
    addLayer({ id = "", type, url, config = {} }) {
      let layer = null;
      if (type === "xyz") {
        layer = L.tileLayer(url, config);
      }

      layer.id = id;
      layer.addTo(this.$map);
    },
    removeLayer(id) {
      let layer = null;
      this.$map.eachLayer(lyr => {
        if (lyr.id && lyr.id === id) {
          layer = lyr;
        }
      });

      if (layer) {
        layer.remove();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;

  #base-map {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .map-tool-container {
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 1000;
  }

  @media screen and (max-width: 768px) {
    .map-tool-container {
      bottom: 80px;
    }
  }

  @media screen and (max-width: 500px) {
    .map-tool-container {
      bottom: 90px;
    }
  }
}
</style>