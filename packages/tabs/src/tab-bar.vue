<template>
  <div class="el-tabs__active-bar" :class="`is-${ rootTabs.tabPosition }`" :style="barStyle">
  </div>
</template>
<script>
  import { arrayFind } from 'xqh-element/src/utils/util';
  export default {
    name: 'TabBar',

    props: {
      tabs: Array
    },

    inject: ['rootTabs'],

    computed: {
      barStyle: {
        get() {
          let style = {};
          let offset = 0;
          let marginLeft = '0px';
          const sizeName = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'width' : 'height';
          const sizeDir = sizeName === 'width' ? 'x' : 'y';
          const firstUpperCase = str => {
            return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
          };
          this.tabs.every((tab, index) => {
            let $el = arrayFind(this.$parent.$refs.tabs || [], t => t.id.replace('tab-', '') === tab.paneName);
            if (!$el) { return false; }

            if (!tab.active) {
              offset += $el[`client${firstUpperCase(sizeName)}`];
              return true;
            } else {
              let maxWid = $el[`client${firstUpperCase(sizeName)}`];
              const tabStyles = window.getComputedStyle($el);
              if (sizeName === 'width' && this.tabs.length > 1) {
                maxWid -= parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight);
                marginLeft = ((maxWid / 2) - 12).toFixed(0) + 'px';
              }
              if (sizeName === 'width') {
                offset += parseFloat(tabStyles.paddingLeft);
              }
              return false;
            }
          });

          const transform = `translate${firstUpperCase(sizeDir)}(${offset}px)`;
          style[sizeName] = '24' + 'px';
          style.transform = transform;
          style.msTransform = transform;
          style.webkitTransform = transform;
          style.marginLeft = marginLeft;

          return style;
        }
      }
    }
  };
</script>
