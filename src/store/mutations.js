
import Vue from 'vue';

import { SET_ITEMS, CLEAR_ITEMS, ADD_ITEM,
        TOGGLE_SELECT_ITEM, DELETE_ITEMS } from './mutation-types';

const mutations = {
  [CLEAR_ITEMS](state) {
    state.items = [];
  },
  [SET_ITEMS](state, items) {
    state.items = items;
  },
  [ADD_ITEM](state, item) {
    state.items.push(item);
  },
  [TOGGLE_SELECT_ITEM](state, id) {
    let it = state.items.find(i => i.id === id);
    if (it) {
      Vue.set(it, 'selected', !it.selected);
    }
  },

  [DELETE_ITEMS](state, items) {
    const deleteIds = items.map(i => i.id);
    state.items = state.items.filter(i => {
      return deleteIds.indexOf(i.id) < 0;
    })
  }

}

export default mutations;
