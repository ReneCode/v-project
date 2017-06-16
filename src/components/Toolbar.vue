<template>
  <div id="toolbar">
    <ul>
      <li>
        <i @click="addText" class="glyphicon glyphicon-font"></i>
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
export default {

  methods: {
    addText() { },
    editItem() { },
    deleteItem() { },
    previousPage() { },
    nextPage() { }
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
  padding-right: 15px;
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
