<template>
  <div class="styles">
    <div class="styles-items">
      <span
        class="styles-item"
        :class="{ active: activeStyle && activeStyle === item }"
        @click="changed(item)"
        v-for="(item, index) of items"
        :key="index"
      >
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script>
let map = null;

export default {
  data() {
    return {
      items: [
        {
          label: "地图",
          key: "emap",
          url: "./styles/streets.json",
          minzoom: 6,
          maxzoom: 19,
        },
        {
          label: "黑夜",
          url: "/styles/dark.json",
          minzoom: 6,
          maxzoom: 19,
        },
        {
          key: "img",
          label: "影像",
          url: "/styles/img.json",
          minzoom: 6,
          maxzoom: 18,
        },
      ],
      visible: false,
      activeStyle: null,
      loading: false,
    };
  },
  mounted() {
    this.$app.$on("init", () => {
      map = this.$map;

      this.activeStyle = this.items[0]
    });
  },
  watch: {
    activeStyle() {
      this.load();
    },
  },
  methods: {
    changed(item) {
      this.activeStyle = item;
    },
    load() {
      const item = this.activeStyle;
      this.loading = true;

      fetch(item.url)
        .then((resp) => resp.json())
        .then((styledata) => {
          styledata.key = item.key;

          this.$store.commit("styledata_changed", styledata);

          /*
          const loadSource = () => {
            if (map.isStyleLoaded()) {
              this.$store.commit("reload_changed");
              map.off("data", loadSource);
            }
          };
          map.on("data", loadSource);
          */
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.styles {
  position: relative;

  &-items {
    box-shadow: inset 0px 0px 3px 1px #09c;
    background-color: rgba(6, 21, 55, 0.9);
  }

  &-item {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    
    & + & {
      margin-left: 3px;
    }

    &.active {
      background:  black;
      box-shadow: inset 0px 0px 3px 1px #09c;
    }
  }
}
</style>