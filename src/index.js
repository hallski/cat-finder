const Vision = require('@google-cloud/vision')
const gcs = require('@google-cloud/storage')
const request = require('superagent')

const secrets = require('../client-secrets.json')
const vision = new Vision()

function labelMatchCat(label) {
  return label.description.indexOf('cat') !== -1 && label.score > 0.8
}

function imageMatchLabels(uri, matcher) {
  const request = { source: { imageUri: uri }}

  return vision.labelDetection(request)
    .then(function(results) { return results[0].labelAnnotations })
    .then(function(labels) { return labels.find(matcher) !== undefined })
}

function notifySlackAboutCatPicture(file) {
  return request
    .post(secrets.slackWebhook)
    .send({ text: `A cat was posted: gs://${file.bucket}/${file.name}` })
}

function logSuccess(result) {
  console.log(`Send to slack finished with status: ${result.status}`)
}

function logError(error) {
  console.log(`Send to slack failed with error: ${error.message}`)
}

function notifySlackIfCat(file) {
  return function(isCat) {
    return isCat ?
      notifySlackAboutCatPicture(file).then(logSuccess, logError) :
      Promise.resolve()
  }
}

function isNewFile(file) {
  return file.resourceState === 'exists' && file.metageneration === '1'
}

exports.catFinder = function(event, callback) {
  const file = event.data

  if (!isNewFile(file)) {
    callback()
    return
  }

  return imageMatchLabels(`gs://${file.bucket}/${file.name}`, labelMatchCat)
    .then(notifySlackIfCat(file))
    .then(callback)
}
