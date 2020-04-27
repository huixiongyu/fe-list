# Vue业务实战

## 01.封装Echart

![echart](https://huixiong.oss-cn-beijing.aliyuncs.com/fe-list/Echart_2020-04-27_16-09-10.png)

图表在To B的应用是经常出现的，折线图、柱状图和饼图等直观展示数据，[Echart](https://github.com/apache/incubator-echarts) 有超过4万颗星，经历过各种业务场景的优化，是图表首选。另外可以选择[Ant G2](https://g2.antv.vision/zh/examples/gallery) ，移动端使用[Ant F2](https://f2.antv.vision/zh/docs/tutorial/getting-started) 。

相关链接：

* [官方实例](https://echarts.apache.org/examples/zh/index.html) 
* [上手教程]([https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts](https://echarts.apache.org/zh/tutorial.html#5 分钟上手 ECharts))

* [配置项手册](https://echarts.apache.org/zh/option.html#title) 实例中有属性配置不同可以在这里查找。
* [API文档](https://echarts.apache.org/zh/api.html#echarts)
* [按需引用的清单](https://github.com/apache/incubator-echarts/blob/master/index.js)

图表的使用，Echart、G2、F2、G6都是需要一个指定的id节点来给他们查找DOM的，然后创建实例之后通过对象的属性来配置各种参数，因此我们可以讲配置项(option对象)放在data里面，页面挂载之后实例调用options里的参数，根据图表的类型抽象成具体的组件，比如折线图组件、饼图组件、柱状图组件等。

**实例**

安装：`npm i echarts`

按需引入：

```
import echarts from 'echarts/lib/echarts'

// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

export default echarts
```



