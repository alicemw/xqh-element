## xqhRadar 雷达图

仅允许输入标准的数字值，可定义范围

### 基础用法

:::demo 要使用它，只需要在`el-input-number`元素中使用`v-model`绑定变量即可，变量的初始值即为默认值。
```html
<template>
    <xqh-radar :options="options"></xqh-radar>
</template>
<script>
  const options = {
    legend: {
      data: [
        {
          code: 'technology',
          name: '核心科技',
          max: 100
        },
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
          code: 'development',
          name: '持续发展',
          max: 100
        },
        {
          code: 'situation',
          name: '财务状况',
          max: 100
        },
        {
          code: 'operation',
          name: '业务经营',
          max: 100
        },
        {
          code: 'gfsaf',
          name: '对外延伸',
          max: 100
        },
        {
          code: 'ffsgsds',
          name: '技术生命力',
          max: 100
        },
        {
          code: 'fsdfs',
          name: '技术影响力',
          max: 100
        },
      ]
    },
    series: [
      {
        name: '行业均值',
        type: 'bar',
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
            code: 'situation',
            value: 90,
          },
          {
            code: 'operation',
            value: 45,
          },
          {
            code: 'gfsaf',
            value: 45,
          },
          {
            code: 'ffsgsds',
            value: 23,
          },
          {
            code: 'fsdfs',
            value: 78,
          },
        ],
        full: false,
        color: '#ecaa42',
        width: 5
      },
      {
        name: '企业得分',
        type: 'qi',
        data: [
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
            code: 'situation',
            value: 90,
          },
          {
            code: 'operation',
            value: 45,
          },
          {
            code: 'gfsaf',
            value: 14,
          },
          {
            code: 'ffsgsds',
            value: 35,
          },
          {
            code: 'fsdfs',
            value: 64,
          },
        ],
        width: 2,
        full: true,
        color: '#1051B5',
        opacity: .5
      },
    ]
  };
  export default {
    data() {
      return {
        num: 1,
        options
      };
    },
    methods: {

    },
    mounted() {
      //Math.ceil(Math.random()*10)
      // setInterval(() => {
      //   this.options.series.forEach(element => {
      //     element.data.forEach(item => {
      //       item.value = Math.ceil(Math.random()*100);
      //     })
      //   });
      // }, 3000);
    },
  };
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|----------|-------------- |----------|--------------------------------  |-------- |
| value / v-model    | 绑定值         | number | — | 0 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| change | 绑定值被改变时触发 | currentValue, oldValue |
| blur | 在组件 Input 失去焦点时触发 | (event: Event) |
| focus | 在组件 Input 获得焦点时触发 | (event: Event) |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
| select | 选中 input 中的文字 | — |
