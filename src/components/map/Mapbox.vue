<template>
  <div class="mapbox">
    <div class="map" :id="mapId"></div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "mapbox",
  computed: {
    styledata() {
      return this.$store.state.styledata;
    },
  },
  data() {
    return {
      mapId: Math.random().toString(36).substr(2),
    };
  },
  created() {
    this.load().then(() => {
      this.init();
    });
  },
  watch: {
    styledata() {
      /* 不能直接将this.styledata赋给map。
        可能是这个js内部加入水印修改了this.styledata，
        而Vuex是禁止直接从外部修改的
      */
      console.log("stylec");
      const styledata = JSON.parse(JSON.stringify(this.styledata));
      this.map.setStyle(styledata, { diff: false });
    },
  },
  methods: {
    load() {
      return new Promise((resolve, reject) => {
        if (window.mapboxgl) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.setAttribute("src", "./lib/mapbox-gl.js");
        document.body.appendChild(script);

        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", "./lib/mapbox-gl.css");

        document.head.appendChild(link);

        script.onload = resolve;
      });
    },
    init() {
      const key = "898f3541e6c196c9a634710017691f6d";
      const center = [120.2, 30.2];
      const zoom = 14;
      const tdtcode = "xihu";

      this.map = new mapboxgl.Map({
        container: this.mapId,
        minZoom: 6,
        maxZoom: 18,
        zoom,
        center,
        renderWorldCopies: false,
        repaint: true,
        trackResize: true,
        attributionControl: false,
        transformRequest: (url, resourceType) => {
          if (resourceType === "Tile") {
            url += `&domain=${location.host}`;

            if (url.includes("{key}")) {
              return {
                url: url.replace("{key}", key),
              };
            }

            if (url.includes("{tdtcode}")) {
              return {
                url: url.replace("{tdtcode}", tdtcode),
              };
            }
          }
        },
      });

      this.map.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        "bottom-right"
      );
      Vue.prototype.$map = this.map;

      this.$app.$emit("map-init");
    },
  },
};
</script>

<style lang="scss">
.mapbox {
  position: relative;
  width: 100%;
  height: 100%;

  .map {
    width: 100%;
    height: 100%;
  }

  .mapboxgl-ctrl-bottom-right .mapboxgl-ctrl {
    margin: 0 10px 64px 0;
    float: right;
    box-shadow: 0 0 10px 2px rgba(31, 51, 73, 0.1);
  }
}
</style>
