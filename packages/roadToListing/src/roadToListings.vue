
<script>
  /*eslint-disable*/
import roadToListing from './roadToListing';
import { deepClone } from '@/utils/util';

export default {
  name: 'ElRoadtolistings',

  components: {
    roadToListing
  },

  props: {
    roadList: Array,
    active: [String, Number],
    space: Number
  },
  render() {
    let { showToadList, space } = this;
    let len = showToadList.length - 1;
    return (
      <div class="el-roadToListings">
        {
          showToadList.map((item, index) => {
            return (
              <road-to-listing 
                type={item.type}
                title={item.title}
                space={space}
                isEnd={index === len}
              ></road-to-listing>
            )
          }) 
        }
      </div>
    )
  },
  computed: {
    showToadList() {
      let list = deepClone(this.roadList);
      let type = 'done';
      list.forEach(item => {
        if (this.active === item.value) {
          item.type = 'now';
          type = 'wait';
        } else {
          item.type = type;
        };
      });
      return list;
    }
  },

  data() {
    return {};
  }
};
</script>

