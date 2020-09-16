<template>
  <div class="map-tool container">
    <div class="map-tool-item" @click="changeMapType">
      <span class="map-tool-icon">
        <icon name="map" scale="2"></icon>
      </span>
      <span class="map-tool-text">{{activeMapType && activeMapType.label}}</span>
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
                "http://t1.tianditu.gov.cn/img_c/wmts?tk=a2f6f87af74c3f92d4cc08a5f6f109c7&layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}",
              config: {
                subdomains: "0123456",
                zoomOffset: 1,
              }
            },
            {
              id: "img-anno",
              type: "xyz",
              url:
                "http://t3.tianditu.gov.cn/cia_c/wmts?tk=a2f6f87af74c3f92d4cc08a5f6f109c7&layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}",
              config: {
                subdomains: "0123456",
                zoomOffset: 1,
                minZoom: 9,
              }
            }
          ]
        },
        {
          label: "地图",
          values: [
            {
              id: "emap",
              type: "xyz",
              url:
                "http://t0.tianditu.gov.cn/vec_c/wmts?tk=a2f6f87af74c3f92d4cc08a5f6f109c7&layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}",
              config: {
                subdomains: "0123456",
                zoomOffset: 1,
              }
            },
            {
              id: "emap-anno",
              type: "xyz",
              url:
                "http://t3.tianditu.gov.cn/cva_c/wmts?tk=a2f6f87af74c3f92d4cc08a5f6f109c7&layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}",
              config: {
                subdomains: "0123456",
                zoomOffset: 1,
                minZoom: 9,
              }
            }
          ]
        }
      ],
      activeMapType: null
    };
  },
  watch: {
    activeMapType(n, o) {
      o &&
        o.values.forEach(l => {
          this.$app.$emit("remove-layer", l.id);
        });

      n.values.forEach(l => {
        this.$app.$emit("add-layer", l);
      });
    }
  },
  mounted() {
    this.activeMapType = this.mapTypes[0];
  },
  methods: {
    changeMapType() {
      this.activeMapType =
        this.activeMapType === this.mapTypes[0]
          ? this.mapTypes[1]
          : this.mapTypes[0];
    },
    measure() {
      const map = this.$map;

      if (this.drawing) {
        return
      }

      const layer = L.polyline([], {
        interactive: false
      }).addTo(map);

      this.layer = layer;

      const tempLayer = L.polyline([], {
        interactive: false
      }).addTo(map);
      let tempPoints = [];

      const remove = () => {
        layer.remove();
        popup.remove();
        dblclickHandler();
      };

      const popup = L.popup({
        autoClose: false,
        closeButton: false
      });

      const setTipText = content => {
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

      const clickHandler = e => {
        layer.addLatLng(e.latlng);
        tempPoints[0] = e.latlng;
        this.drawing = true
        map.doubleClickZoom.disable()

        const len = length(layer.toGeoJSON(), { units: "kilometers" });

        popup
          .setLatLng(e.latlng)
          .setContent(setTipText(len.toFixed(2) + " 公里"))
          .openOn(map);
      };

      const mousemoveHandler = e => {
        if (tempPoints.length) {
          tempPoints[1] = e.latlng;
          tempLayer.setLatLngs(tempPoints);
        }
      };

      const dblclickHandler = e => {
        tempPoints = null;
        tempLayer.remove();
        this.drawing = false
        map.doubleClickZoom.enable()

        map.off("click", clickHandler);
        map.off("mousemove", mousemoveHandler);
        map.off("dblclick", dblclickHandler);
      };

      map.on("click", clickHandler);
      map.on("mousemove", mousemoveHandler);
      map.on("dblclick", dblclickHandler);
    }
  }
};
</script>

<style lang="scss">
.map-tool {
  position: relative;
  display: flex;
  align-items: center;

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