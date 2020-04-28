# Vue业务实战

## 01.封装Echart

![echart](https://huixiong.oss-cn-beijing.aliyuncs.com/fe-list/Echart_2020-04-27_16-09-10.png)

图表在To B的应用是经常出现的，折线图、柱状图和饼图等直观展示数据，[Echart](https://github.com/apache/incubator-echarts) 有超过4万颗星，经历过各种业务场景的优化，是图表首选。另外可以选择[Ant G2](https://g2.antv.vision/zh/examples/gallery) ，移动端使用[Ant F2](https://f2.antv.vision/zh/docs/tutorial/getting-started) 。

相关链接：

* [官方实例](https://echarts.apache.org/examples/zh/index.html)
* [上手教程](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)
* [配置项手册](https://echarts.apache.org/zh/option.html#title) 实例中的各种属性配置参数可以在这里查找。
* [API文档](https://echarts.apache.org/zh/api.html#echarts)
* [按需引用的清单](https://github.com/apache/incubator-echarts/blob/master/index.js)

图表的使用，Echart、G2、F2、G6都是需要一个指定的id节点来给他们查找DOM的，然后创建实例之后通过API绘图，通过对象的属性来配置各种绘图参数，因此我们可以将配置项(option对象)放在data里面，页面挂载之后实例调用options里的参数，根据图表的类型抽象成具体的组件，比如折线图组件、饼图组件、柱状图组件等。

**饼图实例**
![pie-chart](https://huixiong.oss-cn-beijing.aliyuncs.com/fe-list/pie_chart_2020-04-28_10-47-16.png)

安装：`npm i echarts`

按需引入，创建utils文件夹放置这个按需文件：

```
import echarts from 'echarts/lib/echarts';

// 引入需要的内容，如折线，标题，提示框
// 需要引入什么看这个地址 https://github.com/apache/incubator-echarts/blob/master/index.js
import 'echarts/lib/chart/line'; // 折线图
import 'echarts/lib/chart/bar'; // 柱状图
import 'echarts/lib/component/legend'; // 图例组件
import 'echarts/lib/component/title'; // 标题设置
import 'echarts/lib/chart/pie'; // 饼图
import 'echarts/lib/component/tooltip'; // 提示框组件

export default echarts;
```

封装饼状图表：

1. 提供的id必须是动态的，因为这个是组件如果页面上存在相同的id节点会无法绘图。
2. 在挂载的时候就创建echart实例，方便在方法中调用。
3. 将需要动态配置的option项设置成props，比如图表标题、图列列表和数据。
4. 监听页面的变化进行重绘，调用echart的resize API。工程上可以用lodash的节流函数[throttle](https://lodash.think2011.net/throttle) 。

```
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

```

组件调用：

```
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

```

按需引入可以减少很多文件的加载，下面用[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)对比一下直接引入echart和按需的体积，从2.5M减少到了1.06M：

![before](https://huixiong.oss-cn-beijing.aliyuncs.com/fe-list/before_optimize_2020-04-28_10-01-58.png)

![after](https://huixiong.oss-cn-beijing.aliyuncs.com/fe-list/after_optimize_2020-04-28_10-06-50.png)

业务中我们通常希望图表数据为空时隐藏图表，可以通过动态绑定属性来实现，比如将没数据时给组件添加的类中属性opacity值为0, 有数据时值为1。另外可以考虑用v-show。

```
<template>
	<pie-chart :class="[dataList.length === 0 ? 'hide' : '']" />
<template>
<style>
	.hide{
        opacity: 0;
     }
</style>
```



