<template>
  <div class="map-tool container">
    <div class="map-tool-item" @click="toggleLabelVisible">
      <span class="map-tool-icon">
        <icon :name="labelVisible ? 'checked' : 'check'" scale="1.5"></icon>
      </span>
      <span class="map-tool-text">标注</span>
    </div>

    <div class="map-tool-item" @click="changeMapType">
      <span class="map-tool-icon">
        <icon name="map" scale="2"></icon>
      </span>
      <span class="map-tool-text">{{
        activeMapType && activeMapType.label
      }}</span>
    </div>

    <div class="map-tool-item" @click="measure">
      <span class="map-tool-icon">
        <icon name="measure" scale="2"></icon>
      </span>
      <span class="map-tool-text">量测</span>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import length from "@turf/length";

export default {
  data() {
    return {
      mapTypes: [
        {
          label: "影像",
          values: [
            {
              id: "img",
              type: "xyz",
              url:
                "http://srv{s}.zjditu.cn/ZJDOM_2D/wmts?layer=imgmap&style=default&tilematrixset=default028mm&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpgpng&TileMatrix={z}&TileCol={x}&TileRow={y}",
              config: {
                subdomains: "0123456",
                zoomOffset: 1,
                maxZoom: 19,
              },
            },
            {
              id: "img-label",
              type: "xyz",
              url:
                "http://srv{s}.zjditu.cn/ZJDOMANNO_2D/wmts?layer=TDT_ZJIMGANNO&style=default&tilematrixset=default028mm&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpgpng&TileMatrix={z}&TileCol={x}&TileRow={y}",
              config: {
                subdomains: "0123456",
                zoomOffset: 1,
                minZoom: 9,
                maxZoom: 19,
              },
            },
          ],
        },
        {
          label: "地图",
          values: [
            {
              id: "emap",
              type: "xyz",
              url:
                "http://srv{s}.zjditu.cn/ZJEMAP_2D/wmts?layer=TDT_ZJEMAP&style=default&tilematrixset=default028mm&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpgpng&TileMatrix={z}&TileCol={x}&TileRow={y}",
              config: {
                subdomains: "0123456",
                zoomOffset: 1,
                maxZoom: 19,
              },
            },
            {
              id: "emap-label",
              type: "xyz",
              url:
                "http://srv{s}.zjditu.cn/ZJEMAPANNO_2D/wmts?layer=TDT_ZJEMAPANNO&style=default&tilematrixset=default028mm&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpgpng&TileMatrix={z}&TileCol={x}&TileRow={y}",
              config: {
                subdomains: "0123456",
                zoomOffset: 1,
                minZoom: 9,
                maxZoom: 19,
              },
            },
          ],
        },
      ],
      activeMapType: null,
      labelVisible: true,
    };
  },
  watch: {
    activeMapType(n, o) {
      o &&
        o.values.forEach((l) => {
          this.removeLayer(l);
        });

      this.addLayer(n.values[0]);
      if (this.labelVisible) {
        this.addLayer(n.values[1]);
      }
    },
    labelVisible() {},
  },
  mounted() {
    this.activeMapType = this.mapTypes[0];
    this.labelVisible = true;
  },
  methods: {
    toggleLabelVisible() {
      this.labelVisible = !this.labelVisible;

      const opt = this.activeMapType.values[1];
      this.labelVisible ? this.addLayer(opt) : this.removeLayer(opt);
    },
    changeMapType() {
      this.activeMapType =
        this.activeMapType === this.mapTypes[0]
          ? this.mapTypes[1]
          : this.mapTypes[0];
    },
    addLayer(l) {
      this.$app.$emit("add-layer", l);
    },
    removeLayer(l) {
      this.$app.$emit("remove-layer", l.id);
    },
    measure() {
      const map = this.$map;

      if (this.drawing) {
        return;
      }

      const layer = L.polyline([], {
        interactive: false,
      }).addTo(map);

      this.layer = layer;

      const tempLayer = L.polyline([], {
        interactive: false,
      }).addTo(map);
      let tempPoints = [];

      const remove = () => {
        layer.remove();
        popup.remove();
        dblclickHandler();
      };

      const popup = L.popup({
        autoClose: false,
        closeButton: false,
      });

      const setTipText = (content) => {
        const el = document.createElement("div");
        el.className = "measure-marker";

        const text = document.createElement("span");
        text.className = "measure-text";
        text.innerHTML = content;

        const close = document.createElement("span");
        close.className = "measure-close";

        close.addEventListener("click", () => {
          remove();
        });

        el.appendChild(text);
        el.appendChild(close);

        return el;
      };

      const clickHandler = (e) => {
        layer.addLatLng(e.latlng);
        tempPoints[0] = e.latlng;
        this.drawing = true;
        map.doubleClickZoom.disable();

        const len = length(layer.toGeoJSON(), { units: "kilometers" });

        popup
          .setLatLng(e.latlng)
          .setContent(setTipText(len.toFixed(2) + " 公里"))
          .openOn(map);
      };

      const mousemoveHandler = (e) => {
        if (tempPoints.length) {
          tempPoints[1] = e.latlng;
          tempLayer.setLatLngs(tempPoints);
        }
      };

      const dblclickHandler = (e) => {
        tempPoints = null;
        tempLayer.remove();
        this.drawing = false;
        map.doubleClickZoom.enable();

        map.off("click", clickHandler);
        map.off("mousemove", mousemoveHandler);
        map.off("dblclick", dblclickHandler);
      };

      map.on("click", clickHandler);
      map.on("mousemove", mousemoveHandler);
      map.on("dblclick", dblclickHandler);
    },
  },
};
</script>

<style lang="scss">
.map-tool {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;

  &-item {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    padding: 6px 8px;
    font-size: 1.1rem;

    &:hover {
      opacity: 0.8;
    }
  }

  &-icon {
    margin-right: 3px;
  }
}

div.leaflet-popup-content {
  margin: 5px;
}

div.leaflet-popup-content-wrapper {
  border-radius: 6px;
}

.measure-marker {
  display: flex;
  align-items: center;

  .measure-text {
    font-size: 16px;
  }

  .measure-close {
    height: 18px;
    width: 18px;
    display: block;
    background-image: url(~@/assets/img/close.png);
    background-size: contain;
    cursor: pointer;
  }
}
</style>