
import Vue from 'vue';

import * as types from './mutation-types';

const mutations = {
  [types.CLEAR_ITEMS](state) {
    state.items = [];
  },

  [types.SET_ITEMS](state, items) {
    state.items = items;
  },

  [types.ADD_ITEM](state, item) {
    state.items.push(item);
  },

  [types.TOGGLE_SELECT_ITEM](state, id) {
    let it = state.items.find(i => i.id === id);
    if (it) {
      Vue.set(it, 'selected', !it.selected);
    }
  },

  [types.DELETE_ITEMS](state, items) {
    const deleteIds = items.map(i => i.id);
    state.items = state.items.filter(i => {
      return deleteIds.indexOf(i.id) < 0;
    })
  }

}

export default mutations;
