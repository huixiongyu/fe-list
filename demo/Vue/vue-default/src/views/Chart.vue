<template>
    <div>
        <pie-chart
          title="某站点用户来源统计"
          :legendData="legendList"
          :dataList="dataList"
        />
    </div>
</template>
<script>
import PieChart from '@/components/Charts/PieChart.vue';

export default {
  name: 'Chart',
  components: {
    PieChart,
  },
  data() {
    return {
      legendList: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      dataList: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' },
      ],
    };
  },
};
</script>
