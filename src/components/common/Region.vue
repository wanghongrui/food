<template>
  <div class="regions">
    <span
      class="region"
      :class="{active: item === region}"
      @click="select(item)"
      v-for="(item, index) of items"
      :key="index"
    >{{item}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["全部", "上城", "下城", "江干", "西湖", "拱墅"],
    };
  },
  computed: {
    region() {
      return this.$store.state.region;
    },
  },
  methods: {
    select(item) {
      this.$store.commit("region_changed", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.regions {
  display: flex;

  .region {
    flex: 1;
    text-align: center;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &.active {
      background-color: #09c;
      color: white;
    }
  }
}
</style>