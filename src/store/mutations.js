
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

  [types.SELECT_ITEM](state, id) {
    let it = state.items.find(i => i.id === id);
    if (!it) {
      throw new Error(`store: ${types.SELECT_ITEM} error`);
    }
    Vue.set(it, 'selected', true);
  },

  [types.TOGGLE_SELECT_ITEM](state, id) {
    let it = state.items.find(i => i.id === id);
    if (!it) {
      throw new Error("store.item error");
    }
    Vue.set(it, 'selected', !it.selected);
  },

  [types.CLEAR_SELECTION](state) {
    state.items.forEach(item => {
      if (item.selected) {
        item.selected = false;
      }
    })
  },

  [types.DELETE_ITEMS](state, items) {
    const deleteIds = items.map(i => i.id);
    state.items = state.items.filter(i => {
      return deleteIds.indexOf(i.id) < 0;
    })
  },

  [types.MOVE_ITEMS](state, payload) {
    const items = payload.items;
    const translation = payload.translation;
    if (!items || !translation) {
      throw new Error("payload has to contain -items and -translation");
    }
    const ids = payload.items.map(i => i.id);
    let changeItems = state.items.filter(i => ids.indexOf(i.id) >= 0);
    changeItems.forEach(i => {
      i.x += translation.x;
      i.y += translation.y;
    });
  }

}

export default mutations;
