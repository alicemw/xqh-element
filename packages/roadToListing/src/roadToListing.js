export default {
  /*eslint-disable*/
  name: 'roadToListing',
  props: {
    type: String,
    title: String,
    space: {
      default() {
        return 30;
      },
      type: Number
    },
    lastDone: {
      type: Boolean
    },
  },
  data() {
    return {
      linerRight: `-${this.space + 5}px`
    }
  },
  watch: {
    lastDone(val) {
      if(val) {
        let { space } = this;
        let num = 0;
        let tal = space + 5;
        let timer = setInterval(() => {
          if(num < tal) {
            num += 2;
            this.linerRight = `-${num + 5}px`;
          } else {
            clearInterval(timer);
            this.linerRight = `-${tal}px`;
          }
        }, 10);
      };
    }
  },
  render() {
    let { type, space, title, lastDone, linerRight } = this;
    return (
      <div 
      class={{
        'el-roadToListing-box': true,
        'el-roadToListing-box-now': type === 'now'
      }}
      style={{
        marginRight: `${space}px`
      }}
      >
        <div class={[
          `el-${type}`,
          'el-roadToListing'
        ]}>
           <main>
            {title}
          </main>
        </div>
        <div
        ref="liner"
        class={[
          'el-liner',
          `el-${type}-liner`
        ]} style={{
          right: linerRight
        }}></div>
      </div>
    );
  }
};
