## xqhRadar 雷达图

仅允许输入标准的数字值，可定义范围

### 基础用法

:::demo。
```html
<template>
  <div>
      <el-xqh-radar ref="xqhradar" :options="options" type="mini"></el-xqh-radar>
      <el-button @click="update">点击更新数据</el-button>
  </div>
</template>
<script>
  const options = {
    cantonStyle: {// 非必传， 最外层盒子的位置调整
      marginTop: '-20px'
    },
    footerSty: {// 非必传， 用于底部用户列表的样式
    },
    legend: [// 必传， 用于表头项展示，传六个就展示六维度，九维度同理， 其中code会跟series中的code对应，name为表头项文案，max为最大值
      {
        code: 'structure',
        name: '股权结构',
        max: 100
      },
      
      {
        code: 'governance',
        name: '公司治理',
        max: 100
      },
      {
        code: 'technology',
        name: '核心科技',
        max: 100
      },
      {
        code: 'OutwardExtension',
        name: '对外延伸',
        max: 100
      },
      {
        code: 'TechnicalVitality',
        name: '技术生命力',
        max: 100
      },
      {
        code: 'FinancialSituation',
        name: '财务状况',
        max: 100
      },
      {
        code: 'operation',
        name: '业务经营',
        max: 100
      },
      {
        code: 'TechnicalInfluence',
        name: '技术影响力',
        max: 100
      },
      {
        code: 'development',
        name: '持续发展',
        max: 100
      },
    ],
    series: [
      {
        name: '企业得分', // 必传，用于对应用户文案展示
        data: [ // 用于图标数据展示，其中code会跟legend表头中的code对应， value为数据值，可传number || string
          {
            code: 'structure',
            value: '67',
          },
          {
            code: 'governance',
            value: 89,
          },
          {
            code: 'development',
            value: 53,
          },
          {
            code: 'technology',
            value: 23,
          },
          {
            code: 'FinancialSituation',
            value: 85.5,
          },
          {
            code: 'operation',
            value: 45,
          },
          {
            code: 'OutwardExtension',
            value: 14,
          },
          {
            code: 'TechnicalVitality',
            value: 100,
          },
          {
            code: 'TechnicalInfluence',
            value: 64,
          },
        ],
        zIndex: 2,  // 非必传, 用于图窗展示的优先级，可传数字 1 2 3 ... 9999
        borderWidth: 2, // 非必传, 用于图案边框宽度，可传数字，类似1 2 3 4 5
        full: true, // 非必传，用于控制当前图形是否填满颜色 可传true || false, 默认false
        linearGradient: ['#1051B5', '#0064FF'], // 非必传, 用于背景渐变色，目前只支持从左到右渐变，如不传，背景颜色按照color展示
        color: '#1051B5', // 必传，用于底部对应文案，数据点颜色展示, 可传 css颜色代码
        opacity: .5 //  非必传， 用于背景透明度展示，默认为1，可传小数 .1 .2 .3
      },
      {
        name: '行业均值',
        data: [
          {
            code: 'structure',
            value: '12',
          },
          {
            code: 'governance',
            value: 89,
          },
          {
            code: 'development',
            value: 60,
          },
          {
            code: 'technology',
            value: 65,
          },
          {
            code: 'FinancialSituation',
            value: 90,
          },
          {
            code: 'operation',
            value: 45,
          },
          {
            code: 'OutwardExtension',
            value: 45,
          },
          {
            code: 'TechnicalVitality',
            value: 23,
          },
          {
            code: 'TechnicalInfluence',
            value: 82,
          },
        ],
        zIndex: 3,
        full: false,
        color: '#FA8C16', 
        borderWidth: 3
      },
    ]
  };
  export default {
    data() {
      return {
        options,
      };
    },
    methods: {
      update() {
        const { series } = this.options;
        series.forEach(element => {
          element.data.forEach(item => {
            item.value = Math.ceil(Math.random() * 100);
          })
        });
        this.$refs['xqhradar'].updateView();
      },
    },
  };
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|----------|-------------- |----------|--------------------------------  |-------- |
| options   | 雷达数据         | object | — | 0 |
| type      | 雷达图尺寸       | string | mini,init, Oversized | Oversized |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| updateView | 当雷达图表数据有更新时，可通过绑定ref，主动更新 | - |
