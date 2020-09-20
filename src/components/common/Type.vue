<template>
  <div class="type">
    <div class="type-item">
      <div class="type-item-icon">
        <icon name="food-heavy" scale="4"></icon>
      </div>
      <span class="type-item-text">重餐饮(648家)</span>
    </div>

    <div class="type-item">
      <div class="type-item-icon">
        <icon name="food-light" scale="4"></icon>
      </div>
      <span class="type-item-text">轻餐饮(1024家)</span>
    </div>
  </div>
</template>

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