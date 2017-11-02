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

  return visionFetchLabels(`gs://${file.bucket}/${file.name}`)
    .then(any(isCat))
    .then(notifySlack(secrets.slackWebhook, `A cat was posted: gs://${file.bucket}/${file.name}`))
    .then(logSuccess)
    .catch(logError)
    .then(callback)
})
