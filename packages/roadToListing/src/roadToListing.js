export default {
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
    isEnd: Boolean
  },
  render() {
    /*eslint-disable*/
    let { type, isEnd, space, title } = this;
    return (
      <div class="el-roadToListing-box" style={{
        marginRight: !isEnd ? `${space}px` : '0'
      }}>
        <div class={[
          `el-${type}`,
          'el-roadToListing'
        ]}>
           <main>
            {title}
          </main>
        </div>
        {
          !this.isEnd ? (
            <div class={[
              'el-liner',
              `el-${type}-liner`
            ]} style={{
              right: `-${space + 5}px`
            }}></div>
          ) : ''
        }
      </div>
    );
  }
};
