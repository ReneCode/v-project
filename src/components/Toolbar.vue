<template>
  <div id="toolbar">
    <ul>
      <li>
        <i @click="addTextItem" class="glyphicon glyphicon-font"></i>
      </li>
      <li>
        <i @click="editItem" class="glyphicon glyphicon-pencil"></i>
      </li>
      <li>
        <i @click="deleteItem" class="glyphicon glyphicon-trash"></i>
      </li>
  
      <li>
        <i @click="previousPage" class="glyphicon glyphicon-arrow-left"></i>
      </li>
      <li>
        <i @click="nextPage" class="glyphicon glyphicon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>

import EventBus from '../util/event-bus';

export default {

  methods: {
    addTextItem() {
      EventBus.emit('addTextItem', "new text");
    },
    editItem() { },
    deleteItem() { },
    previousPage() {
      EventBus.emit('previousPage');
    },
    nextPage() {
      EventBus.emit('nextPage');
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
  color: #ddd;
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

#toolbar i:hover {
  opacity: 1;
}
</style>
