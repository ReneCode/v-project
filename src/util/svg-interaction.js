
import SvgInteractionZoom from './svg-ia-zoom';
import SvgInteractionPanning from './svg-ia-panning';
import SvgInteractionMousePosition from './svg-ia-mouse-position';
import SvgInteractionSelectItem from './svg-ia-select-item';
import SvgInteractionMoveItem from './svg-ia-move-item';
import SvgInteractionPreprocess from './svg-ia-preprocess';

import SvgInteractionRectangle from './svg-ia-rectangle';

import EventBus from './event-bus';

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
    this.iaList.push(new SvgInteractionMoveItem(svgTransformer));

    this.iaList.push(new SvgInteractionPreprocess(svgTransformer, this));

    // this.debugIa();

    EventBus.on("startIaRectangle", payload => {
      this.startIaRectangle(payload);
    });
  }

  debugIa() {
    this.iaList.forEach(ia => {
      let name = ia.constructor.name + " - ";
      if (ia.dispatch) {
        name += "dispatch";
      } else {
        name += "on...";
      }
      console.log(name);
    })
  }

  dispatch(msg, payload) {
    this.iaList.forEach(ia => {
      if (ia.dispatch) {
        ia.dispatch(msg, payload);
      }
    })
  }

  onClick(ev) {
    this.route("onClick", ev);
  }

  onMouseMove(ev) {
    this.route("onMouseMove", ev);
  }

  onMouseDown(ev) {
    this.route("onMouseDown", ev);
  }

  onMouseUp(ev) {
    this.route("onMouseUp", ev);
  }

  onMouseWheel(ev) {
    this.route("onMouseWheel", ev);
  }

  route(method, ev) {
    const event = window.event || ev; // old IE support

    for (const ia of this.iaList) {
      if (ia[method] && !ia.dispatch) {
        if (ia[method](event) === "stop") {
          break;
        }
      }
    };
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

  startInteraction(ia) {
    this.iaList.unshift(ia);
  }

  startIaRectangle() {
    this.startInteraction(new SvgInteractionRectangle(this.svgTransformer));
  }

}

export default SvgInteraction;
