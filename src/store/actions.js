
import * as types from './mutation-types';

import ItemHelper from '../util/item-helper';

const actions = {

  clearItems({ commit, state }, id) {
    if (state.items.length > 0) {
      commit(types.CLEAR_ITEMS);
    }
  },

  setItems({ commit, state }, items) {
    if (items.length > 0) {
      commit(types.SET_ITEMS, items);
    }
  },

  selectItemById({ commit, state }, itemId) {
    const selectedItems = state.items.filter(it => {
      return ItemHelper.isSelected(it);
    });
    if (selectedItems) {
      selectedItems.forEach(it => ItemHelper.deleteSelected(it));
    }
    let items = state.items.filter(it => it.id === itemId);
    if (!items || items.length !== 1) {
      throw new Error("Item not found");
    }
    ItemHelper.setSelected(items[0]);
  },

  clearSelection({ commit, state }) {
    const selectedItems = state.items.filter(it => {
      return ItemHelper.isSelected(it);
    });
    if (selectedItems) {
      selectedItems.forEach(it => ItemHelper.deleteSelected(it));
    }
  },

  setTranslation({ commit, state }, { itemId, translation }) {
    let items = state.items.filter(it => it.id === itemId);
    if (!items || items.length !== 1) {
      throw new Error("Item not found");
    }
    ItemHelper.setTranslation(items[0], translation);
  }

  // [types.CLEAR_ITEMS](state) {
  //   state.items = [];
  // },

  // [types.SET_ITEMS](state, items) {
  //   state.items = items;
  // },

  // [types.ADD_ITEM](state, item) {
  //   state.items.push(item);
  // },

  // [types.SELECT_ITEM](state, id) {
  //   let it = state.items.find(i => i.id === id);
  //   if (!it) {
  //     throw new Error(`store: ${types.SELECT_ITEM} error`);
  //   }
  //   Vue.set(it, 'selected', true);
  // },

  // [types.TOGGLE_SELECT_ITEM](state, id) {
  //   let it = state.items.find(i => i.id === id);
  //   if (!it) {
  //     throw new Error("store.item error");
  //   }
  //   Vue.set(it, 'selected', !it.selected);
  // },

  // [types.CLEAR_SELECTION](state) {
  //   state.items.forEach(item => {
  //     if (item.selected) {
  //       item.selected = false;
  //     }
  //   })
  // },

  // [types.DELETE_ITEMS](state, items) {
  //   const deleteIds = items.map(i => i.id);
  //   state.items = state.items.filter(i => {
  //     return deleteIds.indexOf(i.id) < 0;
  //   })
  // },

  // [types.MOVE_ITEMS](state, payload) {
  //   const items = payload.items;
  //   const translation = payload.translation;
  //   if (!items || !translation) {
  //     throw new Error("payload has to contain -items and -translation");
  //   }
  //   const ids = payload.items.map(i => i.id);
  //   let changeItems = state.items.filter(i => ids.indexOf(i.id) >= 0);
  //   changeItems.forEach(i => {
  //     i.x += translation.x;
  //     i.y += translation.y;
  //   });
  // }

}

export default actions;
