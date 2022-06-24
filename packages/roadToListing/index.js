import roadToListing from './src/roadToListings.vue';

/* istanbul ignore next */
roadToListing.install = function(Vue) {
  Vue.component(roadToListing.name, roadToListing);
};

export default roadToListing;
