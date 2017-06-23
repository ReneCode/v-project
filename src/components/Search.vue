<template>
  <div class="row">
    <div class="search container-fluid col-xs-8 col-xs-offset-2 text-center">
      <div class="h3">{{title}}</div>
      <div class="form-group has-feedback">
        <input v-model.trim="value" v-on:keyup="keyUp" type="text" class="search-input form-control text-center" placeholder="Search" onfocus="this.placeholder=''" >
        <span v-on:click="onClear()" class="form-control-clear form-control-feedback"><i class="fa fa-times" aria-hidden="true"></i></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'search',
  props: [
    'title'
  ],
  data () {
    return {
      value: '',
      timeoutId: undefined
    }
  },
  computed: {
    debounceTime() {
      return 300;
    }
  },
  components: {
  },
  methods: {
    onClear() {
      this.value = "";
      this.$emit('search', this.value);
    },
    keyUp() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        this.$emit('search', this.value);
      }, this.debounceTime);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.form-control-clear {
  z-index: 10;
  pointer-events: auto;
  cursor: pointer;
}</style>

