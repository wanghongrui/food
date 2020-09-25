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
  },
  data() {
    return {
      mapChartVisible: false,
    };
  },
  mounted() {
    map = this.$map;

    map.on("zoomend", () => {
      const level = map.getZoom();
      this.mapChartVisible = level >= 10 && level < 15;

      if (level < 15) {
        this.itemsLayer.remove();
      } else {
        this.itemsLayer.addTo(map);
      }
    });

    loader.loadScript("./data/data.js").then(() => {
      this.$store.commit("region_changed", "全部");
    });

    this.itemsLayer = L.geoJSON([]);
  },
  watch: {
    item() {
      if (this.items) {
        this.twinkle();
      }
      this.location();
    },
    items() {
      this.addItemsLayer();
    },
    region() {
      this.setItems();
      this.setBorder();
    },
    mapChartVisible(visible) {
      visible ? this.addMapChart() : this.removeMapChart();
    },
  },
  methods: {
    setItems() {
      let features = window.data.features;
      if (this.region !== "全部") {
        features = features.filter(
          (feature) => feature.properties.OBJECTID % 4 === 0
        );
      }
      this.$store.commit("items_changed", features);
    },
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
          weight: 1,
          stroke: 1,
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
    addItemsLayer() {
      const level = map.getZoom();
      this.itemsLayer.addData(this.items);
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
    twinkle () {
      const b = bbox(this.item);
      const bounds = [
        [b[1], b[0]],
        [b[3], b[2]]
      ];
      map.fitBounds(bounds, {
        maxZoom: 17
      });

      this.itemsLayer.eachLayer(f => {
        if (f.feature === this.item) {
          const element = f.getElement();
          element.classList.add("animate");

          setTimeout(() => {
            element.classList.remove("animate");
          }, 5000);
        }
      });
    }
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
