<template>
  <div class="style-switcher">
    <div
      class="vector-switcher el-button el-button--mini"
      :class="{active: isVector}"
      @click="vectorChanged"
    >矢量版</div>

    <el-dropdown @command="changed" trigger="click" v-loading.fullscreen="loading">
      <span class="dropdown-link el-button el-button--mini">
        {{activeStyle && activeStyle.label}}
        <i class="el-icon-arrow-up el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="style" v-for="style of styles" :key="style.key">{{style.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import API from "@/api";

const styles = [
  {
    label: "政务",
    key: "emap",
    url: "/vtiles/styles/tdt/streets_zw.json",
    minzoom: 6,
    maxzoom: 19
  },
  {
    label: "黑夜",
    url: "/vtiles/styles/tdt/dark.json",
    minzoom: 6,
    maxzoom: 19
  },
  {
    key: "img",
    label: "影像",
    url: "/vtiles/styles/tdt/img.json",
    minzoom: 6,
    maxzoom: 18
  }
];

export default {
  data() {
    return {
      styles: null,
      visible: false,
      activeStyle: null,
      loading: false
    };
  },
  mounted() {
    this.map = this.$parent.vmap;

    this.isVector = !this.isTdtDomain;
  },
  watch: {
    styles() {
      this.activeStyle = this.styles[0];
    },
    activeStyle() {
      this.load();
    }
  },
  methods: {
    changed(item) {
      this.activeStyle = item;
    },
    load() {
      const item = this.activeStyle;
      this.loading = true;

      API.Map.getStyleData(item.url)
        .then(styledata => {
          styledata.key = item.key;

            this.$store.commit("styledata_changed", styledata);

            const loadSource = () => {
              if (this.map.isStyleLoaded()) {
                this.$store.commit("reload_changed");
                this.map.off("data", loadSource);
              }
            };
            this.map.on("data", loadSource);
          }

          // reset zoom
          this.map.setMinZoom(item.minzoom || 6);
          this.map.setMaxZoom(item.maxzoom || 19);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.style-switcher {
  position: relative;

  .vector-switcher {
    position: absolute;
    right: 100%;
    white-space: nowrap;
    bottom: 0;
    margin-right: 10px;

    &.active {
      color: #409eff;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>