
import Vue from 'vue';
import * as types from './mutation-types';

import ItemHelper from '../util/item-helper';

import graphicsService from '@/services/graphics-service';

const actions = {

  [types.SET_PROJECTID]({ commit, state }, projectId) {
    commit(types.SET_PROJECTID, projectId);
  },

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
      if (!newItem) {
        reject();
      } else {
        let projectId = state.projectId;
        graphicsService.postItem(projectId, newItem)
          .then(dbId => {
            Vue.set(newItem, "_id", dbId);
            commit(types.ADD_ITEM, newItem);
            resolve(newItem);
          })
          .catch(err => {
            console.error(err);
            reject();
          });
      }
    })
  },

  [types.DELETE_ITEMS]({ commit, state }, items) {
    return new Promise((resolve, reject) => {
      if (!items) {
        reject();
      } else {
        let projectId = state.projectId;
        graphicsService.deleteItems(projectId, items)
          .then(result => {
            commit(types.DELETE_ITEMS, items);
            resolve();
          }, err => {
            console.error(err);
            reject();
          });
      }
    })
  },

  [types.SELECT_ITEM_BY_ID]({ commit, state }, itemId) {
    actions.clearSelection({ commit, state })

    let items = state.items.filter(it => it.id === itemId);
    if (!items || items.length !== 1) {
      console.error("Item not found");
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
