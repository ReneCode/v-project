
import * as types from './mutation-types';

import SvgItem from "@/models/svg-item";

const mutations = {
  [types.SET_PROJECTID](state, projectId) {
    state.projectId = projectId;
    console.log("setProjectId:", projectId);
  },

  [types.SET_PAGE_ID](state, pageId) {
    state.pageId = pageId;
    console.log("setPageId:", pageId);
  },

  [types.RECEIVE_GRAPHIC_ITEMS](state, items) {
    state.items = items;
  },

  [types.ADD_GRAPHIC_ITEM](state, item) {
    state.items.push(item);
  },

  [types.DELETE_ITEMS](state, items) {
    const deleteIds = items.map(i => i._id);
    state.items = state.items.filter(i => {
      return deleteIds.indexOf(i._id) < 0;
    })
  },

  [types.MOVE_ITEMS](state, payload) {
    const items = payload.items;
    const translation = payload.translation;
    if (!items || !translation) {
      throw new Error("payload has to contain -items and -translation");
    }
    const ids = payload.items.map(i => i._id);
    let changeItems = state.items.filter(i => ids.indexOf(i._id) >= 0);
    changeItems.forEach(i => {
      if (i instanceof SvgItem) {
        i.translate(translation.x, translation.y);
      } else {
        i.x += translation.x;
        i.y += translation.y;
      }
    });
  }

}

export default mutations;
