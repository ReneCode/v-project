import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations';
import undoRedoPlugin from './undo-redo-plugin';

const storeConfig = {
  state: {
    items: []
  },
  getters: {
    svgItems: (state) => {
      return state.items;
    },
    selectedItems: (state) => {
      return state.items.filter(i => i.selected === true);
    }
  },

  plugins: [undoRedoPlugin],

  mutations: mutations
};

Vue.use(Vuex);
const store = new Vuex.Store(storeConfig);

export default store;
