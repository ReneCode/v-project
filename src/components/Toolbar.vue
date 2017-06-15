<template>
  <div id="toolbar">
    <i @click="addNote" class="glyphicon glyphicon-plus"></i>
    <i @click="toggleFavorite" class="glyphicon glyphicon-star"></i>
    <i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
  </div>
</template>

<script>
export default {

  methods: {
    addNote() { },
    toggleFavorite() { },
    deleteNote() { }
  }
}
</script>

<style>
#toolbar {
  float: left;
  width: 80px;
  height: 100%;
  background-color: #555;
  color: #777;
  padding: 35px 25px 25px 25px;
}


#toolbar i {
  font-size: 30px;
  margin-bottom: 35px;
  cursor: pointer;
  color: #ccc;
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

#toolbar i:hover {
  opacity: 1;
}

</style>
