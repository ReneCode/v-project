
function convertProperties(orginal) {
//  let obj = JSON.parse(JSON.stringify(orginal));
  return convert(orginal);
}

function convert(obj) {
  if (Array.isArray(obj)) {
    let objs = [];
    obj.forEach(o => {
      objs.push(convertProperties(o));
    })
    return objs;
  }

  if (obj.properties) {
    let props = {};
    obj.properties.forEach(p => {
      props[p._id] = p.Val;
    });
    obj.properties = props;
  }
  return obj;
}

module.exports = convertProperties;

