<template>
  <div class="input-tip" @mouseleave="tipFocusByMouse(-1)">
    <div
      class="item"
      v-for="(t, i) of tips"
      :key="i"
      :class="{ active: tipActiveIndex === i }"
      @mouseenter="tipFocusByMouse(i)"
      @click="tipSelected(t)"
    >
      <span class="icon">
        <icon :name="t.type === 'road' ? 'road' : 'location'" scale="2"></icon>
      </span>
      <span class="text">
        <span class="name">{{ t.name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["keyword"],
  computed: {
    items() {
      return this.$store.state.items;
    },
  },
  data() {
    return {
      tips: [],
      tipActiveIndex: -1,
    };
  },
  created() {
    this.fetch();
  },
  watch: {
    keyword() {
      this.fetch();
    },
    tipActiveIndex(i) {
      this.tipFocused(i);
    },
  },
  methods: {
    fetch() {
      if (!this.keyword) {
        this.tips = [];
        return;
      }

      const key = this.keyword.trim();

      const nameMap = new Map();
      const roadMap = new Map();

      this.items.forEach((item) => {
        const { name, road } = item.properties;
        if (name?.includes(key)) {
          if (!nameMap.has(name)) {
            nameMap.set(name, []);
          }
          nameMap.get(name).push(item);
        }

        if (road?.includes(key)) {
          if (!roadMap.has(road)) {
            roadMap.set(road, []);
          }
          roadMap.get(road).push(item);
        }
      });

      this.tips = [];
      nameMap.forEach((v, k) => {
        this.tips.push({
          name: k,
          type: "name",
          value: v,
        });
      });

      roadMap.forEach((v, k) => {
        this.tips.push({
          name: k,
          type: "road",
          value: v,
        });
      });

      this.tipActiveIndex = -1;
      this.tips.length > 10 && (this.tips.length = 10);
    },
    tipFocusByKeyboard(e) {
      if (e.keyCode === 38) {
        if (this.tipActiveIndex >= 0) {
          this.tipActiveIndex--;
        }
      }
      if (e.keyCode === 40) {
        if (this.tipActiveIndex < this.tips.length - 1) {
          this.tipActiveIndex++;
        }
      }
    },
    tipFocusByMouse(i) {
      this.tipActiveIndex = i;
    },
    tipFocused(i) {
      let item = null;
      if (i >= 0 && i < this.tips.length) {
        item = this.tips[this.tipActiveIndex];
      }
      this.$emit("tip-focused", item.value);
    },
    tipSelected() {
      this.$emit("changed");
    },
  },
};
</script>

<style lang="scss" scoped>
.input-tip {
  position: absolute;
  width: 100%;
  top: calc(100% + 1px);
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
  border-radius: 0 0 3px 3px;
  text-align: left;
  color: white;

  .item {
    padding: 6px 0;
    display: flex;
    align-items: center;

    .icon {
      width: 32px;
    }

    .text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }

    .name {
      font-size: 1.2em;
    }

    .sub {
      color: gainsboro;
      margin-left: 10px;
    }

    &.active {
      opacity: 0.8;
    }
  }
}
</style>

