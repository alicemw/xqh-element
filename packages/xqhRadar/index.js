import xqhRadar from './src/main';

/* istanbul ignore next */
xqhRadar.install = function(Vue) {
  Vue.component(xqhRadar.name, xqhRadar);
};

export default xqhRadar;
