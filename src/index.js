const { filteredEventHandler, storageNewFileEventFilter, visionFetchLabels } = require('./google-cloud')
const { any } = require('./utils')
const { notifySlack } = require('./slack')

const secrets = require('../client-secrets.json')

function isCat(label) {
  return label.description.indexOf('cat') !== -1 && label.score > 0.8
}

function logSuccess() {
  console.log(`Successfully sent to slack`)
}

function logError(error) {
  if (error) {
    console.error(`Function failed with: ${error.message}`)
  }
}

exports.catFinder = filteredEventHandler(storageNewFileEventFilter, function(event, callback) {
  const file = event.data
  const storageUri = `gs://${file.bucket}/${file.name}`

  return visionFetchLabels(storageUri)
    .then(any(isCat))
    .then(notifySlack(secrets.slackWebhook, `A cat was posted: ${storageUri}`))
    .then(logSuccess, logError)
    .then(callback)
})
