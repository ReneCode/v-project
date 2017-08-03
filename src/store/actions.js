
import * as types from './mutation-types';

import ItemHelper from '../util/item-helper';

const actions = {

  [types.CLEAR_ITEMS]({ commit, state }, id) {
    if (state.items.length > 0) {
      commit(types.CLEAR_ITEMS);
    }
  },

  [types.SET_ITEMS]({ commit, state }, items) {
    if (items.length > 0) {
      commit(types.SET_ITEMS, items);
    }
  },

  [types.ADD_ITEM]({ commit, state }, newItem) {
    return new Promise((resolve, reject) => {
      if (newItem) {
        commit(types.ADD_ITEM, newItem);
        resolve(newItem);
      }
      reject();
    })
  },

  [types.SELECT_ITEM_BY_ID]({ commit, state }, itemId) {
    actions.clearSelection({ commit, state })

    let items = state.items.filter(it => it.id === itemId);
    if (!items || items.length !== 1) {
      throw new Error("Item not found");
    }
    ItemHelper.setSelected(items[0]);
  },

  [types.CLEAR_SELECTION]({ commit, state }) {
    const selectedItems = state.items.filter(it => {
      return ItemHelper.isSelected(it);
    });
    if (selectedItems) {
      selectedItems.forEach(it => ItemHelper.deleteSelected(it));
    }
  },

  [types.SET_TRANSLATION_BY_ID]({ commit, state }, { itemId, translation }) {
    let items = state.items.filter(it => it.id === itemId);
    if (!items || items.length !== 1) {
      throw new Error("Item not found");
    }
    ItemHelper.setTranslation(items[0], translation);
  }
}

export default actions;
