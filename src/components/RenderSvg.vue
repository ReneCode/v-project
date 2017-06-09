
<script>
export default {
  name: 'render-svg',
  props: ['svg'],
  render(createElement) {
    // https://vuejs.org/v2/guide/render-function
    var options = {
      'class': { abc: true },
      domProps: {
        innerHTML: this.svg
      }
    }
    return createElement("DIV", options)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
