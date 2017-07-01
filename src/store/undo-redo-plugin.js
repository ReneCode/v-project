
// import * as types from '@/store/mutation-types';
// import store from '@/store';

import undoRedoHistory from './undo-redo-history';

let cloneDeep = require('lodash.clonedeep');

const undoRedoPlugin = (store) => {
  undoRedoHistory.init(store);
  let firstState = cloneDeep(store.state);
  undoRedoHistory.addState(firstState);

  store.subscribe((mutation, state) => {
    // is called AFTER every mutation
    undoRedoHistory.addState(cloneDeep(state));
  });
}

export default undoRedoPlugin;
