<template>
  <div class="list">
    <div class="list-body">
      <div class="list-item" v-for="item of result" :key="item.id">
        <div class="list-item-icon">
          <icon name="location" scale="2"></icon>
        </div>
        <div class="list-item-text">{{item.properties.name}}</div>
      </div>
    </div>
    <div class="list-footer">共计 {{result.length}} 条</div>
  </div>
</template>

<script>
export default {
  computed: {
    result() {
      return this.$store.state.result;
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  position: relative;
  padding: 10px 0;
  background-color: rgba(6, 21, 55, 0.6);

  &-item {
    padding: 6px 0;
    display: flex;
    cursor: pointer;
    font-size: 1.1rem;

    &-icon {
      margin: 0 6px;
    }

    &:hover {
      background-color: rgba(6, 21, 55, 0.9);
    }
  }

  &-footer {
    text-align: center;
  }
}
</style>