
<script>

export default {
  name: 'svg-item',
  props: ['item'],

  render(createElement) {
    var options = this.getRenderOptions(this.item);
    if (options) {
      let svgElement = createElement(this.item.type, options)
      return svgElement;
    }
  },

  methods: {
    getRenderOptions(item) {
      switch (item.type) {
        case "text":
          return this.getTextRenderOptions(this.item);
      }
    },

    getTextRenderOptions(item) {
      return {
        on: {
        },
        attrs: {
          x: item.x,
          y: item.y,
          'font-size': item.fontSize,
          fill: item.fill
        },
        domProps: {
          innerHTML: item.text
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
