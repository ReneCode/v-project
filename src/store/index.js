import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations';
import actions from './actions';
import undoRedoPlugin from './undo-redo-plugin';

import ItemHelper from '@/util/item-helper';

const storeConfig = {
  state: {
    items: []
  },
  getters: {
    svgItems: (state) => {
      return state.items;
    },
    selectedItems: (state) => {
      return state.items.filter(i => {
        return ItemHelper.isSelected(i);
      });
    }
  },

  plugins: [undoRedoPlugin],

  mutations: mutations,

  actions: actions
};

Vue.use(Vuex);
const store = new Vuex.Store(storeConfig);

export default store;
