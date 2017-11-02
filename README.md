# Cat finder
A small example of a Google Cloud Function that triggers on changes in a Google Cloud Storage bucket and checks if it is an image of a cat. If it is, it sends a message to Slack through a webhook.

Deploy with:
```shell
$ ./deploy.sh
```

## Client-secrets.json
The function and deploy script depends on a `client-secrets.json` file in the root directory containing a link to the Slack webhook.

```json
{
  "slackWebhook": "https://hooks.slack.com/..."
}
```
