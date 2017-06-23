
import SvgInteractionZoom from './svg-ia-zoom';
import SvgInteractionPanning from './svg-ia-panning';
import SvgInteractionMousePosition from './svg-ia-mouse-position';
import SvgInteractionSelectItem from './svg-ia-select-item';

class SvgInteraction {
  iaList = [];

  constructor(el, svgTransformer) {
    this.el = el;
    this.svgTransformer = svgTransformer;
    let self = this;
    el.addEventListener('click', (ev) => { self.onClick(ev) });
    el.addEventListener('mousemove', (ev) => { self.onMouseMove(ev) });
    el.addEventListener('mousedown', (ev) => { self.onMouseDown(ev) });
    el.addEventListener('mouseup', (ev) => { self.onMouseUp(ev) });
    el.addEventListener('wheel', (ev) => { self.onMouseWheel(ev) });

    this.iaList.push(new SvgInteractionZoom(svgTransformer));
    this.iaList.push(new SvgInteractionPanning(svgTransformer));
    this.iaList.push(new SvgInteractionMousePosition(svgTransformer));
    this.iaList.push(new SvgInteractionSelectItem(svgTransformer));
  }

  onClick(ev) {
    this.iaList.forEach(ia => {
      if (ia.onClick) {
        ia.onClick(ev);
      }
    })
  }

  onMouseMove(ev) {
    const event = window.event || ev; // old IE support

    this.iaList.forEach(ia => {
      if (ia.onMouseMove) {
        ia.onMouseMove(event);
      }
    });
    this.finishEvent(event)
  }

  onMouseDown(ev) {
    const event = window.event || ev; // old IE support

    this.iaList.forEach(ia => {
      if (ia.onMouseDown) {
        ia.onMouseDown(event);
      }
    })
    this.finishEvent(event)
  }

  onMouseUp(ev) {
    const event = window.event || ev; // old IE support

    this.iaList.forEach(ia => {
      if (ia.onMouseUp) {
        ia.onMouseUp(event);
      }
    })
    this.finishEvent(event)
  }

  onMouseWheel(ev) {
    const event = window.event || ev; // old IE support

    this.iaList.forEach(ia => {
      if (ia.onMouseWheel) {
        ia.onMouseWheel(event);
      }
    })
    this.finishEvent(event)
  }

  finishEvent(event) {
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }
  }
}

export default SvgInteraction;
