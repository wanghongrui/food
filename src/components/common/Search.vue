<template>
  <div class="search">
    <input
      class="search-input"
      type="text"
      v-model="keyword"
      @keydown="keydown"
      placeholder="搜索"
    />
    <span class="map-tool-icon">
      <icon name="search" scale="2"></icon>
    </span>

    <div class="search-tip-container" v-if="showTip">
      <search-tip
        ref="tip"
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
      activeTipItem: null
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
    keydown(e) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        this.$refs.tip.tipFocusByKeyboard(e);
      } else {
        this.showTip = true;
      }
    },
    tipFocused(item) {
      this.activeTipItem = item;
    },
    tipSelected() {
      this.$store.commit("items_changed", this.activeTipItem);

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