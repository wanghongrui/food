<template>
  <div class="type">
    <div class="type-item">
      <div class="type-item-icon">
        <icon name="food-heavy" scale="4"></icon>
      </div>
      <span class="type-item-text">重餐饮({{heavyCount }}家)</span>
    </div>

    <div class="type-item">
      <div class="type-item-icon">
        <icon name="food-light" scale="4"></icon>
      </div>
      <span class="type-item-text">轻餐饮({{lightCount}}家)</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    region() {
      return this.$store.state.region;
    },
  },
  data() {
    return {
      heavyCount: 243,
      lightCount: 512,
    };
  },
  watch: {
    region() {
      this.setData();
    },
  },
  methods: {
    setData() {
      this.heavyCount = 300 + Math.round(Math.random() * 200);
      this.lightCount = 500 + Math.round(Math.random() * 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.type {
  position: relative;
  display: flex;

  &-item {
    flex: 1;
    text-align: center;
    cursor: pointer;
    border: dotted gray 1px;
    padding: 6px 0;

    & + & {
      margin-left: 10px;
    }

    &:hover {
      border-color: transparent;
      background-color: rgba(6, 21, 55, 0.9);
    }
  }
}
</style>