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
    }
  },
  render() {
    let { type, space, title } = this;
    return (
      <div class="el-roadToListing-box" style={{
        marginRight: `${space}px`
      }}>
        <div class={[
          `el-${type}`,
          'el-roadToListing'
        ]}>
           <main>
            {title}
          </main>
        </div>
        <div class={[
          'el-liner',
          `el-${type}-liner`
        ]} style={{
          right: `-${space + 5}px`
        }}></div>
      </div>
    );
  }
};
