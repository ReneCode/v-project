
// import Vue from 'vue';
import * as types from './mutation-types';

// import ItemHelper from '../util/item-helper';
import svgItemFactory from '@/models/svg-item-factory';

import graphicsService from '@/services/graphics-service';

const actions = {

  [types.GET_ALL_GRAPHIC_ITEMS]({ commit, state }, payload) {
    graphicsService.getAllItems(payload.projectId, { pageId: payload.pageId })
      .then(objs => {
        let items = svgItemFactory.createFromObject(objs);
        commit(types.RECEIVE_GRAPHIC_ITEMS, items);
      });
  },

  [types.SET_PROJECTID]({ commit, state }, projectId) {
    commit(types.SET_PROJECTID, projectId);
  },

  [types.SET_PAGE_ID]({ commit, state }, pageId) {
    commit(types.SET_PAGE_ID, pageId);
  },

  [types.ADD_GRAPHIC_ITEM]({ commit, state }, newItem) {
    return new Promise((resolve, reject) => {
      if (!newItem) {
        reject();
      } else {
        let projectId = state.projectId;
        if (!newItem.pageId) {
          newItem.pageId = state.pageId;
        }
        graphicsService.postItem(projectId, newItem)
          .then(obj => {
            let storedItem = svgItemFactory.createFromObject(obj);
            commit(types.ADD_GRAPHIC_ITEM, storedItem);
            resolve(storedItem);
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

  [types.UPDATE_GRAPHIC]({ commit, state }, items) {
    return new Promise((resolve, reject) => {
      if (!items) {
        reject(new Error("items missing"));
      } else {
        graphicsService.updateItems(items)
          .then(result => {
            commit(types.UPDATE_GRAPHIC, items);
            resolve();
          })
          .catch(err => {
            console.error(err);
            reject();
          });
      }
    });
  }

  // [types.SELECT_GRAPHIC_BY_ID]({ commit, state }, itemId) {
  //   actions.clearSelection({ commit, state })

  //   let items = state.items.filter(it => it.id === itemId);
  //   if (!items || items.length !== 1) {
  //     console.error("Item not found");
  //   }
  //   ItemHelper.setSelected(items[0]);
  // },

  // [types.CLEAR_SELECTION]({ commit, state }) {
  //   const selectedItems = state.items.filter(it => {
  //     return ItemHelper.isSelected(it);
  //   });
  //   if (selectedItems) {
  //     selectedItems.forEach(it => ItemHelper.deleteSelected(it));
  //   }
  // },

  // [types.SET_TRANSLATION_BY_ID]({ commit, state }, { itemId, translation }) {
  //   let items = state.items.filter(it => it.id === itemId);
  //   if (!items || items.length !== 1) {
  //     throw new Error("Item not found");
  //   }
  //   ItemHelper.setTranslation(items[0], translation);
  // }
}

export default actions;
