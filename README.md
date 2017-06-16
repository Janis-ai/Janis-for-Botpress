# [Janis](https://developer.Janis.ai)
## For Chatbots Built with Botpress

Artificial intelligence is only as good as the training it receives.  Connect AI from companies like Google and Facebook in 60 seconds and start training with your team. Accelerate automation, make better decisions together, and delight your customers 24/7.

* Train
Define and categorize what customers say and your responses. Simulate bot conversations in a dedicated Slack channel. 

* Copilot
Get real-time alerts when your bot needs a human to take over. Pause your bot and chat live, while training your AI to learn from conversations and improve for the future.

* Gain Insight
Identify bottlenecks in your conversational experience and see where your AI needs more training, then measure the impact of additional training on key performance metrics.

### What you need to get started:
* [Janis for Slack](https://slack.janis.ai)
* [A Chatbot built with Botpress](https://botpress.io/)
* [Optional: An API.AI account](http://www.api.ai) 
* [Optional: Botpress with API.AI module installed](https://botpress.io/)

##### Operational Dependencies:
1.  You'll need an API key from Janis and for each Chatbot a Bot Token.  You can get both of those when you add Janis to Slack.
2.  A Messenger and/or Slack module set up in Botpress. 


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
