<template>
  <div class="search">
    <input
      class="search-input"
      type="text"
      v-model="keyword"
      placeholder="搜索"
    />
    <span class="map-tool-icon">
      <icon name="search" scale="2"></icon>
    </span>

    <div class="search-tip-container" v-if="showTip">
      <search-tip
        :keyword="keyword"
        @changed="tipSelected"
        @tip-focused="tipFocused"
      />
    </div>
  </div>
</template>

<script>
import SearchTip from "./InputTip";

export default {
  components: {
    SearchTip,
  },
  data() {
    return {
      keyword: null,
      showTip: false,
    };
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
  },
  watch: {
    keyword() {
      this.showTip = !!this.keyword;
    },
    items() {
      this.$store.commit("result_changed", this.items);
    },
  },
  methods: {
    // getItems() {
    //   const key = this.keyword.trim();
    //   const items = this.items.filter((item) => {
    //     const props = item.properties;
    //     return props.name?.includes(key) || props.road?.includes(key);
    //   });
    //   this.$store.commit("result_changed", items);
    // },
    tipFocused(item) {
      this.activeTipItem = item;
    },
    tipSelected() {
      this.$store.commit("itemss_changed", [this.activeTipItem]);
      this.$store.commit("item_changed", this.activeTipItem);

      this.activeTipItem = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  display: flex;
  padding: 6px 0;

  &-input {
    flex: 1;
    color: inherit;
    background: none;
    outline: none;
    border: none;
    border-bottom: solid 1px gray;
  }

  &-tip-container {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 111;
    margin-top: 1px;
  }
}
</style>