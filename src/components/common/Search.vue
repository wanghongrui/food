<template>
  <div class="search">
    <input class="search-input" type="text" v-model="keyword" />
    <span class="map-tool-icon">
      <icon name="search" scale="2"></icon>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: null,
    };
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
  },
  watch: {
    keyword() {
      this.getItems();
    },
  },
  methods: {
    getItems() {
      const key = this.keyword.trim();
      const items = this.items.filter((item) => {
        return item.properties.name?.includes(key);
      });
      this.$store.commit("result_changed", items);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
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
}
</style>