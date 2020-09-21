<template>
  <div class="regions">
    <span class="region" @click="select">全部</span>
    <span class="region">上城</span>
    <span class="region">下城</span>
    <span class="region">江干</span>
    <span class="region">西湖</span>
    <span class="region">拱墅</span>
  </div>
</template>

<script>
export default {
  methods: {
    select(region) {
      this.$store.commit("region_changed", region);
    },
  },
};
</script>

<style lang="scss" scoped>
.regions {
  display: flex;

  .region {
    flex: 1;
  }
}
</style>