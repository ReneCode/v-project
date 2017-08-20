<template>
  <div id="toolbar">
    <ul>
      <li>
        <i @click="undo" class="fa fa-undo" :disabled="!canUndo" aria-hidden="true" title="undo"></i>
      </li>
      <li>
        <i @click="redo" class="fa fa-repeat" :disabled="!canRedo" aria-hidden="true" title="redo"></i>
      </li>
  
      <li>
        <i @click="addTextItem" class="glyphicon glyphicon-font"></i>
      </li>
      <li>
        <i @click="addRectangleItem" class="glyphicon glyphicon-unchecked"></i>
      </li>
      <!-- <li>
            <i @click="testing" class="glyphicon glyphicon glyphicon-wrench"></i>
          </li> -->
      <!-- <li>
                  <i @click="editItem" class="glyphicon glyphicon-pencil"></i>
                </li> -->
      <li>
        <i @click="deleteItem" :disabled="!hasSelectedItems" class="glyphicon glyphicon-trash" title="delete"></i>
      </li>
  
      <li>
        <i @click="previousPage" :disabled="!hasPreviousPage" class="glyphicon glyphicon-arrow-left"></i>
      </li>
      <li>
        <i @click="nextPage" :disabled="!hasNextPage" class="glyphicon glyphicon-arrow-right"></i>
      </li>
  
      <li class="separator"></li>
  
      <li>
        <i @click="capture" class="glyphicon glyphicon-camera"></i>
      </li>
  
    </ul>
  </div>
</template>

<script>
import undoRedoHistory from '../store/undo-redo-history';
import EventBus from '../util/event-bus';
import selectionStore from "@/util/selection-store";
import * as types from '../store/mutation-types';
import store from '../store';

export default {

  mounted() {
    undoRedoHistory.onUpdate(this.updateUndoRedo);
  },

  props: [
    'hasPreviousPage',
    'hasNextPage'
  ],

  data() {
    return {
      canUndo: false,
      canRedo: false,
      selectedItems: selectionStore.getItems()
    }
  },

  computed: {
    hasSelectedItems() {
      if (this.selectedItems.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {

    undo() {
      EventBus.emit('undo');
      this.updateUndoRedo();
    },
    redo() {
      EventBus.emit('redo');
      this.updateUndoRedo();
    },
    addTextItem() {
      EventBus.emit('startIaText', "new text")
    },
    addRectangleItem() {
      EventBus.emit('startIaRectangle');
    },
    deleteItem() {
      if (this.selectedItems.length > 0) {
        store.dispatch(types.DELETE_ITEMS, this.selectedItems)
          .then(() => {
            // clear selected items
            selectionStore.clear();
          });
      }
    },
    previousPage() {
      EventBus.emit('previousPage');
    },
    nextPage() {
      EventBus.emit('nextPage');
    },

    capture() {
      EventBus.emit('capturePage');
    },

    testing() {
      EventBus.emit("testing");
    },

    updateUndoRedo() {
      this.canUndo = undoRedoHistory.canUndo();
      this.canRedo = undoRedoHistory.canRedo();
    }
  }
}
</script>

<style scoped>
#toolbar {
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: #555;
  color: #777;
  padding-top: 30px;
  padding-left: 15px;
  padding-right: 20px;
  height: 100vh;
}

ul {
  height: 100%;
  list-style: none;
  flex-grow: 1;
  padding-left: 0px;
}

#toolbar i {
  font-size: 30px;
  margin-bottom: 35px;
  cursor: pointer;
  color: #FFF;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

#toolbar i:hover {
  opacity: 1;
}

#toolbar i[disabled] {
  color: #666 !important;
  opacity: 0.5 !important;
  cursor: auto !important;
}

.separator {
  height: 40px;
  border-top: 2px solid #666;
}
</style>
