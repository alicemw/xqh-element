

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
  export default {
    name: 'xqhRadar',
    data() {
      return {
        defaultXY: typeobj[this.type],
        dataList6: [["核心科技", 0.5], ["财务状况", 0.6], ["业务经营", 0.4], ["股权结构", 0.8], ["公司治理", 0.7],["持续发展", 0.9]],
        dataList9: [["技术布局", 0.5], ["技术质量", 0.6], ["技术影响力", 0.4], ["技术生命力", 0.8], ["研发效率", 0.7],["研发稳定性", 0.9], ["产学研合作", 0.9],["国际布局", 0.9],["创新强度", 0.9],],
      }
    },
    props: {
      type: {
        type: String,
        default() {
          return 'big'
        }
      }
    },
    render() {
      let step = this.dataList6.length;
      let r = this.defaultXY;
      let mapList = [];
      for(let s = 5; s > 0; s--) {
        let item = '';
        for(let i = 0;i < step;i++) {
            let rad = 2 * Math.PI/step * i;
            let x = r + Math.sin(rad)*r*(s/10);
            let y = r + Math.cos(rad)*r*(s/10);
            item += `${x},${y} `
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
        height: this.type === 'Oversized' ? 600 : 500,
        width: this.type === 'Oversized' ? 500: 500
       };
      return (
        <div style="overflow: hidden;">
          <div style={{
            'marginLeft': '-100px',
            'marginTop': '-100px'
          }}>
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
            </svg>
            <el-button onClick={() => {
            }}>点击</el-button>
          </div>
        </div>
      )
    },
  };
</script>
