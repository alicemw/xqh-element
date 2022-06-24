## roadToListing 上市之路
引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

### 基础用法

简单的步骤条。

:::demo 设置`active`属性，接受一个字符串或者数字，
```html
<el-roadtolistings :active="active" :roadList="roadList" :space="30"></el-roadtolistings>

<el-button style="margin-top: 12px;" @click="next">点击演示下一步</el-button>

<script>
  export default {
    data() {
      return {
        active: 3,
        roadList: [
            { title: '上市启蒙', value: 0 },
            { title: '上市规划', value: 1 },
            { title: '中介引入', value: 2 },
            { title: '尽调改制', value: 3 },
            { title: '辅导备案', value: 4 },
            { title: '申报审核', value: 5 },
            { title: '承销发行', value: 6 },
            { title: '上市经营', value: 7 }
        ]
      };
    },

    methods: {
      next() {
        if (this.active < 7) {
            this.active++;
        } else {
            this.active = 0
        };
      }
    }
  }
</script>
```
:::


### roadToListings Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| space | 每个 step 的间距，不填写将默认30间距。 | number | — | — |
| roadList | 步骤条的列表，传title和value。 | number，string | — | — |
| active | 当前步骤的标记（意思指到哪一步了）。 | number，string | — | — |