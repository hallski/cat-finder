/**
 * Returns a function that takes an array of items and returns a promise that will resolve to the items
 * if any item match the predicate.
 *
 * @param {Function} predicate
 */
function any(predicate) {
  return function(items) {
    return items.find(predicate) !== undefined ? Promise.resolve(items) : Promise.reject()
  }
}

module.exports = {
  any
}

