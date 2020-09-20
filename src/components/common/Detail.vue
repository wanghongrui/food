<template>
  <div class="detail">
    <div class="detail-header">
      <span class="detail-title">活动板</span>
      <span class="detail-close" @click="close">
        <icon name="close" scale="1.2" />
      </span>
    </div>
    <div class="detail-content">
      <div class="detail-item" v-for="(field, index) of fields" :key="index">
        <span class="detail-item-label">{{field.label}}</span>
        <span class="detail-item-value">{{field.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    item() {
      return this.$store.state.item;
    },
  },
  data() {
    return {
      fields: [
        {
          label: "路名",
          value: "教工路",
        },
        {
          label: "店名",
          value: "牛肉火锅",
        },
        {
          label: "年份",
          value: "2020",
        },
        {
          label: "面积",
          value: "214平方米",
        },
        {
          label: "层数",
          value: "2",
        },
      ],
    };
  },
  methods: {
    close() {
      this.$store.commit("item_changed");
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  position: relative;

  &-header {
    display: flex;
  }

  &-title {
    flex: 1;
    font-size: 1.2rem;
  }

  &-close {
    cursor: pointer;
  }

  &-item {
    display: flex;
    font-size: 1.1rem;
    margin: 8px 0;

    &-label {
      opacity: 0.8;
      margin-right: 6px;
    }
  }
}
</style>