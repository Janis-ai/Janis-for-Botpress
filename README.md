# [Janis](https://www.Janis.ai) - Message Management
## For Chatbots Built with Botpress

Janis helps teams train and monitor bots and fix problems fast.  [Build a bot with Botpress](https://botpress.io) and add the Janis module to ensure delightful conversational experiences in every messaging channel.

* Train
Collaborate on what users say and your responses in a dedicated training channel. Experience exactly what your users will experience when they message you.

* Monitor
Janis alerts you in Slack when your bot needs your help. Use our smart alerts, or create your own alerts to bring humans in the loop.

* Fix Problems Fast
Take over for your bot and chat live to retain your users, while training your AI to learn from the conversation. Hand control back to your bot when you're done.

To learn more about Janis' capabilities, visit [Janis.ai](https://www.janis.ai)

### What you need to get started:
* [Add Janis to your Slack team](https://www.janis.ai)
* [A Chatbot built with Botpress](https://botpress.io/)

##### Operational Dependencies:
1.  You'll need an API key and a Client Key for your Chatbot.  You can get both of those (free) when you add Janis to Slack. 
2.  A Messenger and/or Slack module set up in Botpress. 
3.  Janis can help you train your AI from Slack.  Currently Dialogflow, formerly known as API.AI (http://www.api.ai) is supported.

### Installation
Installing modules on Botpress is simple. By using CLI, users only need to type this command in their terminal to add Janis module to their bot.
```bash
$ botpress install janis
```
It's also possible to install it through the Botpress UI in the modules section.


### Usage
Janis will immediately start alerting you when your bot has no response, and when your users say something with a negative sentiment. You can also set up custom alerts, such as when a user requests assistance.

##### Dial 0 to Speak With a Live Human Being:

Janis can trigger alerts to suggest when a human should take over for your Chatbot. To enable this, create an intent such as when a customer explicitly requests live assistance, and then include the following lines of code where your bot listens for this intent:

```javascript
// match an intent to talk to a real human
bp.hear({ type: 'message', text: 'human' }, (event, next) => {
  // let the user know that they are being routed to a human
  var responseText = 'Hang tight. A human is on the way.'
  if (event.platform == "facebook") {
    bp.messenger.sendText(event.user.id, responseText)
  } else if (event.platform == "slack") {
    bp.slack.sendText(event.channel.id, responseText)
  }
  // send a Janis alert to your slack channel
  // that the user could use assistance
  bp.events.emit('assistanceRequested', {platform: event.platform, raw: event.raw})
})
```


Go back to Slack and wait for alerts. That's it! 
[Be sure to check out our examples.](./examples/)


### Looking for something we don't yet support?  
* [Join our mailing list and we'll notifiy you](https://www.janis.ai)
* [Contact Support](mailto:support@janis.ai)
