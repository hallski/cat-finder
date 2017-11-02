// Returns a function taking items and returns a resolved promise if any item match the predicate. Otherwise a rejection.

/**
 * Returns a function that takes an array of items and returns a promise that will resolve if any item match the predicate.
 *
 * @param {Function} predicate
 */
function any(predicate) {
  return function(items) {
    return items.find(predicate) !== undefined ? Promise.resolve() : Promise.reject()
  }
}

module.exports = {
  any
}

