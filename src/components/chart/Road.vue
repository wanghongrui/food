<template>
  <div class="chart" ref="canvas"></div>
</template>

<script>
import echarts from "echarts";

export default {
  computed: {
    region() {
      return this.$store.state.region;
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      const option = {
        color: ["#00868B", "#00FFFF"],
        grid: {
          left: 70,
          top: 30,
          bottom: 30,
          right: 20,
        },
        textStyle: {
          color: "rgba(255, 255, 255, 0.8)",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["重餐饮", "轻餐饮"],
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
          },
        },
        yAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: [
              "古翠路",
              "丰潭路",
              "古墩路",
              "学院路",
              "教工路",
              "保俶北路",
              "莫干山路",
              "湖墅南路",
              "文一路",
              "文二路",
              "文三路",
              "天目山路",
            ],
          },
        ],
        xAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "重餐饮",
            type: "bar",
            data: [320, 332, 289, 423, 312, 320, 332, 289, 320, 423, 312, 222],
          },
          {
            name: "轻餐饮",
            type: "bar",
            data: [220, 182, 231, 238, 239, 220, 182, 231, 238, 182, 239, 111],
          },
        ],
      };

      const chart = echarts.init(this.$refs["canvas"]);
      chart.setOption(option);
    },
  },
};
</script>