import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations';

const storeConfig = {
  state: {
    items: []
  },
  getters: {
    svgItems: (state) => {
      return state.items;
    }
  },
  mutations: mutations
};

Vue.use(Vuex);
const store = new Vuex.Store(storeConfig);

export default store;
