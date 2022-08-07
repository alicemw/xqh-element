

<script type="text/babel">
/* eslint-disable */
// <animateTransform
//     from={'400 400'}
//     to={points}
//     dur="10s"
//     />
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
    'Oversized': 700
  }
  const rotatePoint = (point, angle, originPoint = {x: 0, y: 0}) => {
      const cosA = Math.cos(angle * Math.PI);
      const sinA = Math.sin(angle * Math.PI);
      const rx = originPoint.x + (point.x - originPoint.x) * cosA - (point.y - originPoint.y) * sinA;
      const ry = originPoint.y + (point.x - originPoint.x) * sinA - (point.y - originPoint.y) * cosA;
      return { x: rx,y: ry };
  };
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
        data.forEach((item, index) => {
          item.ind = index;
          if(!obj[item.code]) obj[item.code] = item;
        });
        return obj;
      },
      handelSeries() {
        const findItem = (arr, code) => {
          const len = arr.length;
          for(let i = 0;i < len;i ++) {
            if(arr[i] && code === arr[i].code) {
              return arr[i];
            }
          };
          return {
            code,
            value: '-'
          };
        };
        const { series, legend } = this.options;
        const legendData = legend.data;
        const len = legendData.length;
        series.forEach(item => {
          let arr = item.data;
          let list = [];
          for(let i = 0;i < len;i ++) {
            if(arr[i] && arr[i].code === legendData[i].code) {
              list[i] = arr[i];
            } else {
              list[i] = findItem(arr, legendData[i].code);
            };
          };
          item.data = list;
        });
        return series;
      }
    },
    render() {
      const { legend = {} } = this.options;
      const legendData = legend.data;
      let step = legendData.length;
      const titleDistance = 1.3;
      if(step === 0) return;
      let r = this.defaultXY;
      let mapList = [];
      for(let s = this.s; s > 0; s--) {
        let item = '';
        for(let i = 0;i < step;i++) {
            let rad = 2 * Math.PI / step * i;
            let x0 = r + Math.sin(rad) * r * (s / 10);
            let y0 = r + Math.cos(rad) * r * (s / 10);
            const { x, y } = rotatePoint({x: x0, y: y0}, 180, {x: r, y: r});
            item += `${x},${y} `;
        };
        mapList.push(item)
      };
      let lineList = [];
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
        };
      };
      let styleobj = {
        height: typeStyleObj[this.type],
        width: typeStyleObj[this.type]
      };
      const getTitle = () => {
        return legendData.map((item, i) => {
          const rad = 2 * Math.PI / step * i;
          const x0 = r + Math.sin(rad) * r * 0.5 * titleDistance;
          const y0 = r + Math.cos(rad) * r * 0.5 * titleDistance;
          const {x, y} = rotatePoint({x: x0, y: y0}, 180, {x: r, y: r});
          return {
            x: x - 40,
            y,
            ...item,
          }
        })
      }
      let poitList = [];
      let linePoiList = [];
      const series = this.handelSeries;
      try {
        const legendObj = this.legendObj;
        series.forEach(item => {
          const { full = false, color, data = [], borderWidth, opacity } = item;
          let points = '';
          data.forEach((element, i) => {
            const { code, value } = element;
            const { max } = legendObj[code];
            const rad = 2 * Math.PI / step * i;
            let proportion = isNaN(+value) ? false : (value / max);
            if(proportion) {
              proportion = proportion > 1 ? 1 : proportion;
              const x0 = r + Math.sin(rad) * r * 0.5 * proportion;
              const y0 = r + Math.cos(rad) * r * 0.5 * proportion;
              const { x, y } = rotatePoint({x: x0, y: y0}, 180, {x: r, y: r});
              points += `${x},${y} `
            };
          });
          let style = {
            ['fill-opacity']: full ? opacity : 0
          };
          if(color) style.stroke = color;
          if(borderWidth) {
            style['stroke-width'] = borderWidth
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
            let mapLine = points.split(' ').filter(Boolean).map(iop => {
              let [x, y] = iop.split(',');
              return {
                x,
                y,
                style
              }
            });
            linePoiList = [ ...linePoiList, ...mapLine ];
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
                <polygon points={mapList[0]}
                fill="none"
                style={`stroke: ${lineBg};`}/>
              }
              {
                poitList.map(item => {
                  const { points, style } = item;
                  return (
                    <polygon
                    points={points}
                    style={style}>
                    </polygon>
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
              { 
                getTitle().map((item, i) => {
                  const { x, y, name } = item
                  return (
                    <text x={x} y={y}>{name}</text>
                  )
                })
              }
            </svg>
            <footer>
              {
                series.map(item => {
                  const { full, name, color } = item;
                  let styObj = {
                    border: `1px solid ${color}`,
                    borderRadius: '50%',
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    margin: '0 10px'
                  };
                  if(full) {
                    styObj['background'] = color;
                  }
                  return (
                    <div style="padding: 0 12px;">
                      <i style={styObj}></i>
                      <span>{name}</span>
                    </div>
                  )
                })
              }
            </footer>
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
