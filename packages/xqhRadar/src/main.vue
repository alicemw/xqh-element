<script type="text/babel">
/* eslint-disable */
import { fillingZero, getmm } from "@/utils/util";
const bgArr = "rgba(16, 81, 181,0.1)";
const lineBg = "rgba(16, 81, 181,0.2)";
const typeStyleObj = {
  mini: 350,
  init: 600,
  Oversized: 700,
};
const typeobj = {
  mini: 180,
  init: 300,
  Oversized: 350,
};
const rotatePoint = (point, angle, originPoint = { x: 0, y: 0 }) => {
  const cosA = Math.cos(angle * Math.PI);
  const sinA = Math.sin(angle * Math.PI);
  const rx =
    originPoint.x +
    (point.x - originPoint.x) * cosA -
    (point.y - originPoint.y) * sinA;
  const ry =
    originPoint.y +
    (point.x - originPoint.x) * sinA -
    (point.y - originPoint.y) * cosA;
  return { x: rx, y: ry };
};
export default {
  name: "ElXqhRadar",
  data() {
    return {
      defaultXY: typeobj[this.type],
      s: 5,
      mapList: [],
      poitList: [],
      linePoiList: [],
      fillList: [],
      initPoilt: "",
      getmm: "",
    };
  },
  props: {
    type: {
      type: String,
      default() {
        return "Oversized";
      },
    },
    options: {
      default() {
        return {};
      },
    },
  },
  computed: {
    typeTextStyle() {
      const type = this.type;
      return {
        mini: {
          textStyle: {
            fontSize: "12px",
            transform: "translate(10px, 0)",
          },
          iCan: '10px',
          textProportion: 1.2,
        },
        init: {
          textStyle: {
            fontSize: "14px",
            transform: "translate(10px, 0)",
          },
          iCan: '10px',
          textProportion: 1.35,
        },
        Oversized: {
          iCan: '12px',
          textProportion: 1.56,
        },
      }[type];
    },
    titleDistance() {
      const type = this.type;
      return {
        'mini': 1.4,
        'init': 1.3,
        'Oversized': 1.25,
      }[type]
    },
    legendObj() {
      const { legend } = this.options;
      if (!legend) return {};
      let obj = {};
      legend.forEach((item, index) => {
        item.ind = index;
        if (!obj[item.code]) obj[item.code] = item;
      });
      return obj;
    },
    getTitle() {
      const series = this.handelSeries;
      if (!series || series.length === 0) return false;
      let r = this.defaultXY;
      const titleDistance = this.titleDistance;
      const { legend = {} } = this.options;
      const legendData = legend;
      let step = legendData.length;
      return legendData.map((item, i) => {
        const rad = ((2 * Math.PI) / step) * i;
        const x0 = r + Math.sin(rad) * r * 0.5 * titleDistance;
        const y0 = r + Math.cos(rad) * r * 0.5 * titleDistance;
        const { x, y } = rotatePoint({ x: x0, y: y0 }, 180, { x: r, y: r });
        const childs = series.map((iop) => {
          const { color, data } = iop;
          return {
            color,
            value: data[i].value,
          };
        });
        return {
          x: x - 40,
          y,
          childs,
          ...item,
        };
      });
    },
    handelSeries() {
      const findItem = (arr, code) => {
        const len = arr.length;
        for (let i = 0; i < len; i++) {
          if (arr[i] && code === arr[i].code) {
            return arr[i];
          }
        }
        return {
          code,
          value: "-",
        };
      };
      const { series, legend } = this.options;
      const legendData = legend;
      const len = legendData.length;
      series.forEach((item) => {
        let arr = item.data;
        let list = [];
        for (let i = 0; i < len; i++) {
          if (arr[i] && arr[i].code === legendData[i].code) {
            list[i] = arr[i];
          } else {
            list[i] = findItem(arr, legendData[i].code);
          }
        }
        item.data = list;
      });
      return series;
    },
  },
  methods: {
    init() {
      this.getmm = getmm();
      this.getBg();
    },
    getBg() {
      const { legend = {} } = this.options;
      const legendData = legend;
      let step = legendData.length;
      if (step === 0) return;
      let r = this.defaultXY;
      let mapList = [];
      for (let s = this.s; s > 0; s--) {
        let item = "";
        for (let i = 0; i < step; i++) {
          let rad = ((2 * Math.PI) / step) * i;
          let x0 = r + Math.sin(rad) * r * (s / 10);
          let y0 = r + Math.cos(rad) * r * (s / 10);
          const { x, y } = rotatePoint({ x: x0, y: y0 }, 180, { x: r, y: r });
          item += `${x},${y} `;
        }
        mapList.push(item);
      }
      this.mapList = mapList;
      this.initPoilt = mapList[mapList.length - 1];
      let lineList = [];
      const mapOneArr = mapList[0].split(" ") || [];
      let len = mapOneArr.length;
      for (let i = 0; i < len; i++) {
        let item = mapOneArr[i];
        if (item) {
          let arr = item.split(",");
          lineList.push({
            x1: arr[0],
            y1: arr[1],
          });
        }
      }
      this.lineList = lineList;
      this.getPoitList();
    },
    getInitPoit() {
      const series = this.handelSeries;
      let poitList = [];
      let linePoiList = [];
      let fillList = [];
      const { legend = {} } = this.options;
      const legendData = legend;
      const step = legendData.length;
      const r = this.defaultXY;
      try {
        const legendObj = this.legendObj;
        series.forEach((item) => {
          const {
            full = false,
            color,
            data = [],
            borderWidth = 1,
            opacity = 1,
            linearGradient = [],
            zIndex = 0,
          } = item;
          let points = "";
          data.forEach((element, i) => {
            const { code, value } = element;
            const { max } = legendObj[code];
            const rad = ((2 * Math.PI) / step) * i;
            let proportion = isNaN(+value) ? false : (value / max).toFixed(2);
            if (proportion) {
              proportion = proportion > 1 ? 1 : proportion;
              const x0 = r + Math.sin(rad) * r * 0.5 * proportion;
              const y0 = r + Math.cos(rad) * r * 0.5 * proportion;
              const { x, y } = rotatePoint({ x: x0, y: y0 }, 180, {
                x: r,
                y: r,
              });
              points += `${x},${y} `;
            }
          });
          let style = {
            ["fill-opacity"]: full ? opacity : 0,
            stroke: color,
            filter: "url(#feOffset)",
          };
          if (borderWidth) {
            style["stroke-width"] = borderWidth;
          }
          if (full) {
            style["fill"] = color;
          }
          if (linearGradient instanceof Array && linearGradient.length > 0) {
            let fullKey = getmm();
            style["fill"] = `url(#${fullKey})`;
            fillList.push({
              stopList: linearGradient,
              id: fullKey,
            });
          }
          const poitLen = points.split(" ").filter(Boolean).length;
          if (points && poitLen === step) {
            poitList.push({
              points,
              style,
              zIndex,
            });
          } else {
            let mapLine = points
              .split(" ")
              .filter(Boolean)
              .map((iop) => {
                let [x, y] = iop.split(",");
                return {
                  x,
                  y,
                  style,
                };
              });
            linePoiList = [...linePoiList, ...mapLine];
          }
        });
        this.fillList = fillList;
        return [poitList.sort((a, b) => a.zIndex - b.zIndex), linePoiList];
      } catch (e) {
        console.log(e, "catch");
        return [[], []];
      }
    },
    getPoitList() {
      const [poitList, linePoiList] = this.getInitPoit();
      this.poitList = poitList;
      this.linePoiList = linePoiList;
    },
    updateView() {
      const key = this.getmm;
      const [poitList, linePoiList] = this.getInitPoit();
      if (poitList.length !== this.poitList.length) {
        this.poitList = poitList;
        this.linePoiList = linePoiList;
      } else {
        poitList.forEach((item, i) => {
          const { style } = item;
          const { points } = this.poitList.find(
            (iop) => iop.style.stroke === style.stroke
          );
          item.from = points;
          let animationCheck = document.getElementById(`animation-${key}${i}`);
          if (animationCheck) animationCheck.beginElement();
        });
        this.poitList = poitList;
      }
    },
  },
  render() {
    const key = this.getmm;
    const styleobj = {
      height: typeStyleObj[this.type],
      width: typeStyleObj[this.type],
    };
    const { footerSty = {}, cantonStyle = {} } = this.options;
    const { textStyle = {}, textProportion, iCan = '12px' } = this.typeTextStyle;
    return (
      <div
        class={{
          canton: true,
          [`canton-${this.type}`]: true,
        }}
        style={cantonStyle}
      >
        <div
          class={{
            psvg: true,
          }}
        >
          <svg height={styleobj.height} width={styleobj.width}>
            {this.mapList.map((item, index) => {
              let style = {
                fill: bgArr,
              };
              if (index === 0) style.stroke = lineBg;
              return <polygon points={item} style={style} />;
            })}
            {this.lineList.length > 0 &&
              this.lineList.map((item) => {
                const { x1, y1 } = item;
                let defaultXY = this.defaultXY;
                return (
                  <line
                    x1={x1}
                    y1={y1}
                    x2={defaultXY}
                    y2={defaultXY}
                    style={`stroke: ${lineBg};`}
                  />
                );
              })}
            {this.fillList.length > 0 &&
              this.fillList.map((item) => {
                const { id, stopList } = item;
                return (
                  <defs>
                    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
                      {stopList.map((iuy, i) => {
                        return <stop offset={`${i * 100}%`} stop-color={iuy} />;
                      })}
                    </linearGradient>
                  </defs>
                );
              })}
            <defs>
              <filter id="feOffset" x="0" y="0" width="200%" height="200%">
                <feOffset result="offOut" in="SourceAlpha" dx="2" dy="1" />
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            {this.poitList &&
              this.poitList.length > 0 &&
              this.poitList.map((item, i) => {
                const { points, style, from } = item;
                return (
                  <polygon points={points} style={style}>
                    <animate
                      attributeName="points"
                      id={`animation-${key}${i}`}
                      from={from ? from : this.initPoilt}
                      to={points}
                      dur=".3s"
                      repeatCount="1"
                    ></animate>
                  </polygon>
                );
              })}
            {this.linePoiList.map((item) => {
              const { x, y, style } = item;
              let defaultXY = this.defaultXY;
              return (
                <line
                  x1={x}
                  y1={y}
                  x2={defaultXY}
                  y2={defaultXY}
                  style={style}
                />
              );
            })}
            {this.getTitle &&
              this.getTitle.map((item) => {
                const { x, y, name, childs } = item;
                let num = -30;
                return (
                  <g>
                    <text x={x} y={y} style={textStyle}>
                      {name}
                    </text>
                    {childs.length > 0 &&
                      childs.map((iuy, i) => {
                        num += 30;
                        const { value, color } = iuy;
                        return (
                          <g>
                            <text
                              x={x + num * textProportion}
                              y={y + 20}
                              font-family="Microsoft YaHei-Regular, Microsoft YaHei"
                              style={{...textStyle,transform:childs.length == 1?'translateX(2em)':`translateX(${(i == 1 && childs[0] && childs[0].value > 99.9?15:10)}px)`}}
                              font-weight="200"
                              stroke={color}
                            >
                              {!isNaN(value) ? " " + fillingZero(value) : " --"}
                              {i !== childs.length - 1 && (
                                <tspan
                                  dx="5"
                                  style={textStyle}
                                  font-weight="600"
                                  stroke="#f8f5f9"
                                  font-size="14"
                                >
                                  |
                                </tspan>
                              )}
                            </text>
                          </g>
                        );
                      })}
                  </g>
                );
              })}
          </svg>
          <footer style={footerSty}>
            {this.handelSeries.map((item) => {
              const { full, name, color } = item;
              let styObj = {
                border: `1px solid ${color}`,
                borderRadius: "50%",
                display: "inline-block",
                width: iCan,
                height: iCan,
                margin: "0 10px",
              };
              if (full) {
                styObj["background"] = color;
              }
              return (
                <div style="padding: 0 12px;">
                  <i style={styObj}></i>
                  <span style={{fontSize: textStyle.fontSize}}>{name}</span>
                </div>
              );
            })}
          </footer>
        </div>
      </div>
    );
  },
  created() {
    this.init();
  },
};
</script>
