<template>
  <div
    class="el-roadToListings">
    <road-to-listing
    v-for="(item, index) in showToadList"
    :key="index"
    :type="item.type"
    :title="item.title"
    :space="space"
    ></road-to-listing>
  </div>
</template>

<script>
import Migrating from 'xqh-element/src/mixins/migrating';
import roadToListing from './roadToListing.vue';
import { deepClone } from '@/utils/util';

export default {
  name: 'ElRoadtolistings',

  components: {
    roadToListing
  },

  mixins: [Migrating],

  props: {
    roadList: Array,
    active: [String, Number],
    space: Number,
    processStatus: {
      type: String,
      default: 'process'
    }
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
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'center': 'center is removed.'
        }
      };
    }
  },

  watch: {}
};
</script>
