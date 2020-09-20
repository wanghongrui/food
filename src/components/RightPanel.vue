<template>
  <div class="right-panel">
    <div class="search-box box">
      <Search />
    </div>

    <div class="type-box box">
      <Type />
    </div>

    <div class="list-box box">
      <List />
    </div>
  </div>
</template>

<script>
import Search from "@/components/common/Search";
import Type from "@/components/common/Type";
import List from "@/components/common/List";

export default {
  components: {
    Search,
    Type,
    List,
  },
};
</script>

<style lang="scss" scoped>
.right-panel {
  position: relative;
  padding: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .box + .box {
    margin-top: 10px;
  }

  .list-box {
    flex: 1;
    overflow: hidden;
  }
}
</style>