
// polyfill for Safari
// https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

