
import Vue from 'vue';

import { SET_ITEMS, CLEAR_ITEMS, ADD_ITEM, TOGGLE_SELECT_ITEM } from './mutation-types';

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
  }
}

export default mutations;
