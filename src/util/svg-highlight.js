
class SvgHighlight {

  highlightedIds = [];
  className = 'highlighted';

  constructor(svg, className) {
    this.svg = svg;
    this.className = className;
  }

  clear() {
    this.highlightedIds.forEach(id => {
      let element = this.svg.getElementById(id);
      if (element) {
        element.classList.remove(this.className);
      }
    });
  }

  highlightById(ids) {
    this.clear();

    this.highlightedIds = ids;
    ids.forEach(id => {
      let element = this.svg.getElementById(id);
      if (element) {
        element.classList.add(this.className);
      }
    });
  }
}

export default SvgHighlight;
