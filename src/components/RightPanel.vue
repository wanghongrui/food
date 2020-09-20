<template>
  <div class="right-panel">
    <div class="search-box box">
      <Search />
    </div>
  </div>
</template>

<script>
import Search from "@/components/common/Search";

export default {
  components: {
    Search,
  },
};
</script>

<style lang="scss" scoped>
.right-panel {
  position: relative;
}
</style>