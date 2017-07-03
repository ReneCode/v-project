
function pickedElementId(event) {
  const pt = getPoint(event);
  const element = document.elementFromPoint(pt.x, pt.y);
  if (element) {
    let pickedElement;
    switch (element.nodeName) {
      case "text":
        pickedElement = element;
        break;
      case "tspan":
        if (element.parentNode && element.parentNode.nodeName === "text") {
          pickedElement = element.parentNode;
        }
        break;
    }

    if (pickedElement) {
      const id = pickedElement.getAttribute("gid");
      if (id) {
        return id;
      }
    }
    return undefined;
  } else {
    return undefined;
  }
}

function getPoint(event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
}

export default pickedElementId;
