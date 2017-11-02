const Vision = require('@google-cloud/vision')

const vision = new Vision()

/**
 * Wraps an event handler with a filter which will call the supplied handler if predicate rutns true, otherwise
 * shortcuts the event handling.
 *
 * @param {Function} predicate
 * @param {Function} handler
 */
function filteredEventHandler(predicate, handler) {
  return function(event, callback) {
    if (predicate(event)) {
      handler(event, callback)
    } else {
      callback()
    }
  }
}

/**
 * Filter for events in Google Cloud Storage that returns true if the event is a newly created file.
 *
 * @param {Object} event
 */
function storageNewFileEventFilter(event) {
  const file = event.data
  return file.resourceState === 'exists' && file.metageneration === '1'
}

/**
 * Uses the Google Cloud Vision API to fetch labels for an image at a specific URI.
 *
 * Returns a promise which resolves to the labels.
 *
 * @param {string} uri
 */
function visionFetchLabels(uri) {
  const visionRequest = { source: { imageUri: uri }}

  return vision.labelDetection(visionRequest)
    .then(function(results) { return results[0].labelAnnotations })
}


module.exports = {
  filteredEventHandler,
  storageNewFileEventFilter,
  visionFetchLabels
}