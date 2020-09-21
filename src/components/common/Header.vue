<template>
  <header class="header">
    <span class="header-title-icon icon horizontal-mirror">
      <icon name="xiegang" scale="4" />
    </span>
    <h1 class="header-title">
      <span class="header-title-text">重污染餐饮业分布电子地图</span>
    </h1>
    <span class="header-title-icon icon">
      <icon name="xiegang" scale="4" />
    </span>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0),
    #093b74,
    #093b74,
    #093b74,
    rgba(0, 0, 0, 0)
  );

  &-title {
    margin: 0;
    font-size: 2rem;
    letter-spacing: 0.2rem;
  }

  .horizontal-mirror {
    transform: rotateY(180deg);
  }
}
</style>