const request = require('superagent')

/**
 * Posts a message to Slack, using the webhook URI.
 *
 * Returns a promise to be notified when the post has happened.
 *
 * @param {string} webhook Uri to the webhook for posting messages in Slack
 * @param {string} message The message to post
 */
function notifySlack(webhook, message) {
  return function() {
    return request
      .post(webhook)
      .send({ text: message })
  }
}

module.exports = {
  notifySlack
}
