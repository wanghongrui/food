<template>
  <div class="chart" ref="canvas"></div>
</template>

<script>
import echarts from "echarts";

export default {
  mounted() {
    this.render();
  },
  methods: {
    render() {
      const option = {
        color: ["#00868B", "#00FFFF"],
        grid: {
          left: 50,
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
            data: ["上城区", "下城区", "江干区", "西湖区", "拱墅区"],
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
            data: [320, 332, 289, 423, 312],
          },
          {
            name: "轻餐饮",
            type: "bar",
            data: [220, 182, 231, 238, 239],
          },
        ],
      };

      const chart = echarts.init(this.$refs["canvas"]);
      chart.setOption(option);
    },
  },
};
</script>