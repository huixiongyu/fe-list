<template>
    <div :id="id" :style="{width: width, height: height}"></div>
</template>
<script>
import echarts from '@/utils/lib/echarts';

export default {
  props: {
    // 容器宽度
    width: {
      type: String,
      default: '100%',
    },
    // 容器高度
    height: {
      type: String,
      default: '400px',
    },
    // 图表标题
    title: {
      type: String,
      default: '饼图',
    },
    // 图例列表
    legendData: {
      type: Array,
      default: () => [],
    },
    // 饼图数据data里的数据
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      id: `chart${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`,
      chartInstance: null, // 实例
      timer: '',
      option: {
        title: {
          text: this.title,
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.legendData,
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.dataList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.chartInstance = echarts.init(document.getElementById(this.id));
    this.drawChart();
    window.addEventListener('resize', this.resize);
  },
  destroyed() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    drawChart() {
      this.chartInstance.setOption(this.option);
    },
    resize() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.chartInstance.resize();
      }, 300);
    },
  },
};
</script>
