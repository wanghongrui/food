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
import BaseMap from "@/components/map/BaseMap";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import border from "@/assets/region";
import mask from "@turf/mask";
import bbox from "@turf/bbox";
import center from "@turf/center";
import L from "leaflet";
import echarts from "echarts";
import loader from "load-script-promise";

let map = null;
let chartMarkers = [];

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
    items() {
      return this.$store.state.items;
    },
    region() {
      return this.$store.state.region;
    },
    resize() {
      return this.$store.state.resize;
    },
  },
  data() {
    return {
      mapChartVisible: false,
    };
  },
  mounted() {
    this.$app.$on("map-init", () => {
      map = this.$map;

      loader.loadScript("./data/data.js").then(() => {
        this.$app.$emit('data-init')
      });
    });
  },
  watch: {
    item() {
      if (this.items) {
        this.twinkle();
      }
      this.location();
    },
    items() {
      this.setItems();
    },
    region() {
      this.setItems();
      this.setBorder();
    },
    mapChartVisible(visible) {
      visible ? this.addMapChart() : this.removeMapChart();
    },
    resize() {
      map.resize();
    },
  },
  methods: {
    setItems() {
      let features = window.data.features;
      if (this.region !== "全部") {
        // filter by region
      }

      const data = {
        type: "FeatureCollection",
        features,
      };

      if (!this.dataSource) {
        map.addSource("data", {
          type: "geojson",
          data: window.data,
        });
        map.addLayer({
          id: "data",
          type: "fill",
          source: "data",
          layout: {},
          paint: {
            "fill-color": "#088",
            "fill-opacity": 0.5,
          },
        });

        map.on("click", "data", (e) => {
          const id = e.features[0].properties.OBJECTID;
          window.data.features.forEach((f) => {
            if (f.properties.OBJECTID === id) {
              this.$store.commit("item_changed", f);
            }
          });
        });

        this.dataSource = map.getSource("data");
      } else {
        this.dataSource.setData(data);
      }
      this.$store.commit("items_changed", features);
    },
    setBorder() {
      let target = border;

      if (this.region !== "全部") {
        target = border.features.find((f) => f.properties.name === this.region);
      }
      const masked = mask(target);

      if (!this.borderSource) {
        map.addSource("border", {
          type: "geojson",
          data: masked,
        });
        map.addLayer({
          id: "border",
          type: "fill",
          source: "border",
          layout: {},
          paint: {
            "fill-color": "rgb(26, 47, 101)",
            "fill-opacity": 0.5,
          },
        });

        this.borderSource = map.getSource("border");
      } else {
        this.borderSource.setData(masked);
      }

      this.fitBounds(target);
    },
    location() {
      this.fitBounds(this.item);
    },
    fitBounds(feature) {
      const bounds = bbox(feature);
      map.fitBounds(bounds);
    },
    createMapChart(feature) {
      const {
        geometry: { coordinates },
      } = center(feature);

      const el = document.createElement("div");
      el.className = "leaflet-chart-container";
      el.style.width = "81px";
      el.style.height = "81px";

      const icon = L.divIcon({
        html: el,
        iconSize: [81, 81],
      });
      const marker = L.marker(coordinates.reverse(), {
        icon,
      }).addTo(map);
      chartMarkers.push(marker);

      const option = {
        color: ["#00868B", "#00FFFF"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "餐饮",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            labelLine: {
              show: false,
            },
            data: [
              { value: Math.round(Math.random() * 300) + 200, name: "重餐饮" },
              { value: Math.round(Math.random() * 300) + 100, name: "轻餐饮" },
            ],
          },
        ],
      };

      const chart = echarts.init(el);
      chart.setOption(option);
    },
    addMapChart() {
      if (this.region === "全部") {
        border.features.forEach((feature) => {
          this.createMapChart(feature);
        });
      } else {
        const target = border.features.find(
          (f) => f.properties.name === this.region
        );
        this.createMapChart(target);
      }
    },
    removeMapChart() {
      chartMarkers.forEach((m) => m.remove());
      chartMarkers.length = 0;
    },
    twinkle() {
      const bounds = bbox(this.item);
      map.fitBounds(bounds);

      /*
      this.itemsLayer.eachLayer((f) => {
        if (f.feature === this.item) {
          const element = f.getElement();
          element.classList.add("animate");

          setTimeout(() => {
            element.classList.remove("animate");
          }, 5000);
        }
      });
      */
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
    width: fit-content;
    height: 100%;
    z-index: 1;
  }

  .right-panel-container {
    position: relative;
    width: 280px;
    max-width: 30%;
    height: 100%;
    z-index: 1;
    box-shadow: inset 0px 0px 6px 2px #09c;
  }

  ::v-deep .animate {
    animation: twinkle 1s 5;
  }
}
</style>
