# [Janis](https://www.Janis.ai) - A Customer Service Toolkit For Slack

Janis alerts you in Slack when your bot can't communicate and opens a channel for you to take over live.  Janis automatically resumes when you're done.  If you use AI such as API.AI you can connect it to Janis and train your AI from live conversation transcripts.  Add Janis to your Slack team and then integrate this SDK into bots you're building in minutes. Janis begins working immediately.  It's an elegant solution to unify your team, bot and customer communications in a single, intuitive interface.

![Takeover](https://www.janis.ai/github/takeover.gif)


### What you can do with Janis:
You can view a full list of features at (https://www.janis.ai).  This toolkit enables you to integrate Janis into your bot so you can manage your messaging experience from Slack.  Key features include:
* Get real-time alerts when your bot is failing your users
* Take over live to retain your users.  Janis automatically takes over when you're done
* Train AI on the fly through real conversations
* Get reports and insights on how to improve your AI and your conversational experience
* Collaborate with your Slack team on customer service

### What you need to get started:
* [Janis for Slack](https://slack.com/oauth/authorize?scope=im:history,users:read,users:read.email,commands,chat:write:bot,chat:write:user,channels:read,channels:history,files:write:user,channels:write,links:read,links:write,bot&client_id=23850726983.39760486257)
* [Botpress with Messenger and/or Slack module installed](https://botpress.io/)
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
