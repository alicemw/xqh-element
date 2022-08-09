

<script type="text/babel">

/* eslint-disable */
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
        mapList: [],
        poitList: [],
        linePoiList: [],
      }
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
        if(!legend) return {};
        let obj = {};
        legend.forEach((item, index) => {
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
        const legendData = legend;
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
    methods: {
      getBg() {
        const { legend = {} } = this.options;
        const legendData = legend;
        let step = legendData.length;
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
        this.mapList = mapList;
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
        this.lineList = lineList;
        this.getPoitList();
      },
      getTitle () {
        const series = this.handelSeries;
        if(!series || series.length === 0) return false;
        let r = this.defaultXY;
        const titleDistance = 1.3;
        const { legend = {} } = this.options;
        const legendData = legend;
        let step = legendData.length;
        return legendData.map((item, i) => {
          const rad = 2 * Math.PI / step * i;
          const x0 = r + Math.sin(rad) * r * 0.5 * titleDistance;
          const y0 = r + Math.cos(rad) * r * 0.5 * titleDistance;
          const {x, y} = rotatePoint({x: x0, y: y0}, 180, {x: r, y: r});
          const childs = series.map(iop => {
            const { color, data } = iop;
            return {
              color,
              value: data[i].value
            }
          });
          return {
            x: x - 40,
            y,
            childs,
            ...item,
          }
        })
      },
      getPoitList(returnPOi = false) {
        const series = this.handelSeries;
        let poitList = [];
        let linePoiList = [];
        const { legend = {} } = this.options;
        const legendData = legend;
        const step = legendData.length;
        const r = this.defaultXY;
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
            };
          });
          if(returnPOi) return [poitList, linePoiList];
            this.poitList = poitList;
            this.linePoiList = linePoiList;
        } catch(e) {
          console.log(e)
        };
      },
      updateView() {
        const [poitList, linePoiList] = this.getPoitList(true);
        if(poitList.length !== this.poitList.length) {
          this.poitList = poitList;
          this.linePoiList = linePoiList;
        } else {
          poitList.forEach((item, i) => {
            const { style } = item;
            const { points } = this.poitList.find(iop => iop.style.stroke === style.stroke);
            item.from = points;
            let animationCheck = document.getElementById(`animation-to-check${i}`);
            if(animationCheck) animationCheck.beginElement();
          });
          this.poitList = poitList;
        };
      }
    },
    render() {
      let styleobj = {
        height: typeStyleObj[this.type],
        width: typeStyleObj[this.type]
      };
      return (
        <div class={{
          "canton": true,
          [`canton-${this.type}`]: true
          }}>
          <div class="psvg" >
            <svg height={styleobj.height} width={styleobj.width}>
              {
                this.mapList.map((item, index) => {
                  let style = {
                    fill: bgArr[index],
                  };
                  if(index === 0) style.stroke = lineBg;
                  return (
                    <polygon points={item}
                    style={style}/>
                  )
                })
              }
              {
                this.lineList && this.lineList.length > 0 && (this.lineList.map(item => {
                  const { x1, y1 } = item;
                  let defaultXY = this.defaultXY;
                  return (
                    <line x1={x1} y1={y1} x2={defaultXY} y2={defaultXY}
                    style={`stroke: ${lineBg};`}/>
                  )
                }))
              }
              {
                this.poitList && this.poitList.length > 0 && (this.poitList.map((item, i) => {
                  const { points, style, from } = item;
                  return (
                    <polygon
                    points={points}
                    style={style}>
                    <animate 
                    attributeName="points"
                    id={`animation-to-check${i}`}
                    from={from ? from : "400.00000000000034,360 425.7115043874618,369.3582222752407 439.3923101204884,393.0540728933225 434.64101615137736,419.9999999999997 413.6808057330265,437.5877048314362 386.31919426697294,437.58770483143644 365.3589838486223,420.0000000000003 360.6076898795117,393.0540728933231 374.28849561253867,369.35822227524113 "}
                    to={points}
                    dur=".5s" 
                    repeatCount="1"
                    ></animate>
                    </polygon>
                  )
                }))
              }
              {
                this.linePoiList.map(item => {
                  const { x, y, style } = item;
                  let defaultXY = this.defaultXY;
                  return (
                    <line x1={x} y1={y} x2={defaultXY} y2={defaultXY}
                    style={style}/>
                  )
                })
              }
              { 
                this.getTitle() && ( this.getTitle().map(item => {
                  const { x, y, name, childs } = item;
                  let num = - 30;
                  return (
                    <g>
                        <text x={x} y={y} font-size="16px">{name}</text>
                        {
                          childs.length > 0 && (
                            childs.map((iuy, i) => {
                              num += 30;
                              return (
                                <g>
                                 <text 
                                  x={x + num} 
                                  y={y + 20} 
                                  font-family="Microsoft YaHei-Regular, Microsoft YaHei" 
                                  font-size="14px" 
                                  font-weight="200" 
                                  stroke={iuy.color}
                                  >
                                  {iuy.value}
                                  </text>
                                {
                                  i !== childs.length - 1 && (
                                    <text 
                                      x={x + num + 20} 
                                      y={y + 20} 
                                      font-size="14px" 
                                      font-weight="600" 
                                      stroke="#f8f5f9"
                                      >
                                      |
                                    </text>
                                  )
                                }
                                </g>
                              )
                            })
                          )
                        }
                    </g>
                  )
                }))
              }
            </svg>
            <footer>
              {
                this.handelSeries.map(item => {
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
        </div>
      )
    },
    created() {
      this.getBg();
    }
  };
</script>
