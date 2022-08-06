

<script type="text/babel">
/* eslint-disable */
import { deepClone } from '@/utils/util';

  const bgArr = [
    '#e5ebf8',
    '#d0d6ed',
    '#bdc6e8',
    '#aab6e1',
    '#9aaadb'
  ];
  const lineBg = '#8699cc';
  const typeobj = {
    'mini': 200,
    'init': 250,
    'big': 300,
    'Oversized': 400
  };
  const typeStyleObj = {
    'mini': 300,
    'init': 400,
    'big': 500,
    'Oversized': 600
  }
  
  export default {
    name: 'xqhRadar',
    data() {
      return {
        defaultXY: typeobj[this.type],
        s: 5,
      }
    },
    methods: {
    },
    props: {
      type: {
        type: String,
        default() {
          return 'Oversized'
        }
      },
      options: {
        default() {
          return {};
        }
      }
    },
    computed: {
      legendObj() {
        const { legend } = this.options;
        if(!legend) return null;
        let { data = [] } = legend;
        let obj = {};
        data.forEach(item => {
          if(!obj[item.code]) obj[item.code] = item;
        });
        return obj;
      },
    },
    render() {
      const { legend } = this.options;
      let { data } = legend;
      let step = data.length;
      let r = this.defaultXY;
      let mapList = [];
      for(let s = this.s; s > 0; s--) {
        let item = '';
        for(let i = 0;i < step;i++) {
            let rad = 2 * Math.PI/step * i;
            let x = r + Math.sin(rad) * r * (s / 10);
            let y = r + Math.cos(rad) * r * (s / 10);
            item += `${x},${y} `;
        };
        mapList.push(item)
      };
      let lineList = [];
      let borderList = [];
      const mapOneArr = mapList[0].split(' ') || [];
      let len = mapOneArr.length;
      for(let i = 0;i < len;i ++) {
        let item = mapOneArr[i];
        if(item) {
          let arr = item.split(',');
          lineList.push({
            x1: arr[0],
            y1: arr[1]
          });
          if(mapOneArr[i + 1]) {
            let arrNext = mapOneArr[i + 1].split(',');
            borderList.push({
              x1: arr[0],
              y1: arr[1],
              x2: arrNext[0],
              y2: arrNext[1]
            })
          } else {
            borderList.push({
              x1: arr[0],
              y1: arr[1],
              x2: mapOneArr[0].split(',')[0],
              y2: mapOneArr[0].split(',')[1]
            })
          }
        };
      };
      
      let styleobj = {
        height: typeStyleObj[this.type],
        width: typeStyleObj[this.type]
      };
      let poitList = [];
      let linePoiList = [];
      try {
        const { series } = this.options;
        if(!series || series.length === 0) return;
        const legendObj = this.legendObj;
        series.forEach(item => {
          const { full = false, color, data, width, opacity } = item;
          let points = '';
          data.forEach((element, i) => {
            const { code, value } = element;
            const { max } = legendObj[code];
            let proportion = isNaN(+value) ? false : (value / max);
            if(proportion) {
              proportion = proportion > 1 ? 1 : proportion;
              const rad = 2 * Math.PI/step * i;
              const x = r + Math.sin(rad) * r * 0.5 * proportion;
              const y = r + Math.cos(rad) * r * 0.5 * proportion;
              points += `${x},${y} `
            };
          });
          let style = {
            ['fill-opacity']: full ? opacity : 0
          };
          if(color) style.stroke = color;
          if(width) {
            style['stroke-width'] = width
          };
          if(full) {
            style['fill'] = color;
          };

          const poitLen = points.split(' ').filter(Boolean).length;
          if(points && poitLen === step) {
            poitList.push({
              points,
              style
            })
          } else {
            linePoiList = points.split(' ').filter(Boolean).map(iop => {
              let [x, y] = iop.split(',');
              return {
                x,
                y,
                style
              }
            })
          }
        })
      } catch(e) {
        console.log(e)
      };
      return (
        <div class={{
          "canton": true,
          [`canton-${this.type}`]: true
          }}>
          <div class="psvg" >
            <svg height={styleobj.height} width={styleobj.width}>
              {
                mapList.map((item, index) => {
                  let style = {
                    fill: bgArr[index],
                  }
                  return (
                    <polygon points={item}
                    style={style}/>
                  )
                })
              }
              {
                lineList.map(item => {
                  const { x1, y1 } = item;
                  let defaultXY = this.defaultXY;
                  return (
                    <line x1={x1} y1={y1} x2={defaultXY} y2={defaultXY}
                    style={`stroke: ${lineBg};`}/>
                  )
                })
              }
              {
                borderList.map(item => {
                  const { x1, y1, x2, y2 } = item;
                  return (
                    <line x1={x1} y1={y1} x2={x2} y2={y2}
                    style={`stroke: ${lineBg};`}/>
                  )
                })
              }
              {
                poitList.map(item => {
                  const { points, style } = item;
                  return (
                    <polygon
                    points={points}
                    style={style}/>
                  )
                })
              }
              {
                linePoiList.map(item => {
                  const { x, y, style } = item;
                  let defaultXY = this.defaultXY;
                  return (
                    <line x1={x} y1={y} x2={defaultXY} y2={defaultXY}
                    style={style}/>
                  )
                })
              }
            </svg>
          </div>
          <el-button onClick={() => {
            this.dataList6 = this.dataList9;
            // this.$forceUpdate()
          }}>点击</el-button>
        </div>
      )
    },
  };
</script>
