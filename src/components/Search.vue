<template>
  <div class="row">
    <div class="search col-xs-8 col-xs-offset-2 text-center">
      <div v-if="title" class="h3">{{title}}</div>
      <div v-else class="height-15"></div>
      <div class="form-group has-feedback">
        <input ref="input" :value="value" v-on:keyup="keyUp" type="text" class="search-input form-control text-center" placeholder="Search" onfocus="this.placeholder=''" >
        <span v-on:click="onClear()" class="form-control-clear form-control-feedback"><i class="fa fa-times" aria-hidden="true"></i></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'search',
  props: [
    'title',
    'value'
  ],
  data () {
    return {
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
      this.emit("");
    },
    keyUp() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        const input = this.$refs.input.value;
        this.emit(input);
      }, this.debounceTime);
    },
    emit(val) {
      this.$emit('input', val);
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
}

.height-15 {
  margin-bottom: 15px;
}

</style>

