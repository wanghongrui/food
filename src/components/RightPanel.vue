<template>
  <div class="right-panel">
    <div class="search-box box">
      <Search />
    </div>

    <div class="type-box box">
      <Type />
    </div>
  </div>
</template>

<script>
import Search from "@/components/common/Search";
import Type from "@/components/common/Type";

export default {
  components: {
    Search,
    Type,
  },
};
</script>

<style lang="scss" scoped>
.right-panel {
  position: relative;
  padding: 12px;

  .box + .box {
    margin-top: 10px;
  }
}
</style>