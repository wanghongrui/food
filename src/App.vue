<template>
  <div id="app">
    <MapView />
  </div>
</template>

<script>
import Vue from "vue";
import MapView from "./components/MapView.vue";

export default {
  name: "App",
  components: {
    MapView,
  },
  created() {
    Vue.prototype.$app = new Vue();
  },
};
</script>

<style lang="scss">
$theme-black: #061537;
$theme-grid-white: #a39d9d;
$theme-color: rgba(0, 0, 0, 0.1);

:root {
  font-size: 14px;
}

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  color: white;

  background-color: transparentize($theme-black, 0.1);
  background-position: center;
  background-size: 10px 10px;
  background-image: linear-gradient(
      0deg,
      transparentize($theme-black, 1),
      transparentize($theme-black, 1) 90%,
      rgba(255, 255, 255, 0.1) 90%,
      rgba(255, 255, 255, 0.1)
    ),
    linear-gradient(
      90deg,
      transparentize($theme-black, 1),
      transparentize($theme-black, 1) 90%,
      rgba(255, 255, 255, 0.1) 90%,
      rgba(255, 255, 255, 0.1)
    );
}

* {
  box-sizing: border-box;
}
</style>
