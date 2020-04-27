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
      instance: null, // 实例
      option: {
        title: {
          text: '某站点用户访问来源',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' },
            ],
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
    this.drawChart();
  },
  methods: {
    drawChart() {
      const myChart = echarts.init(document.getElementById(this.id));
      myChart.setOption(this.option);
    },
  },
};
</script>
