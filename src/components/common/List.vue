<template>
  <div class="list">
    <div class="list-body">
      <vue-scroll>
        <div
          class="list-item"
          :class="{ active: item === itemSelected }"
          @click="select(item)"
          v-for="item of result"
          :key="item.id"
        >
          <div class="list-item-icon">
            <icon name="location" scale="2"></icon>
          </div>
          <div class="list-item-text">{{ item.properties.name }}</div>
        </div>
      </vue-scroll>
    </div>
    <div class="list-footer">共计 {{ result.length }} 条</div>
  </div>
</template>

<script>
export default {
  computed: {
    result() {
      return this.$store.state.result.slice(0, 40);
    },
    itemSelected() {
      return this.$store.state.item;
    },
  },
  methods: {
    select(item) {
      this.$store.commit("item_changed", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  position: relative;
  height: 100%;
  background-color: rgba(6, 21, 55, 0.6);
  display: flex;
  flex-direction: column;

  &-body {
    flex: 1;
    overflow: auto;
  }

  &-item {
    padding: 6px 0;
    display: flex;
    cursor: pointer;
    font-size: 1.1rem;

    &-icon {
      margin: 0 6px;
    }

    &.active {
      background-color: rgba(6, 21, 55, 0.9);
      border: solid 1px gray;
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