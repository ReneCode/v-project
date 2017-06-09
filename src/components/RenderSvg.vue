
<script>

export default {
  name: 'render-svg',
  props: ['svg', 'width', 'height'],

  render(createElement) {
    // console.log("rendered:", this.svg)
    // https://vuejs.org/v2/guide/render-function
    var options = {
      // 'class': { abc: true },
      domProps: {
        innerHTML: this.svg
      }
    }

    let div = createElement("DIV", options)
    return div;
  },

  updated() {
    let svg = this.$el.querySelector('svg');
    if (svg) {
      if (this.width) {
        svg.setAttribute("width", this.width);
      }
      if (this.height) {
        svg.setAttribute("height", this.height)
      }
      svg.setAttribute("transform", "scale(2)")
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
