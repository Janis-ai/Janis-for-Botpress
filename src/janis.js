/**
 * Janis
 *
 * This file contains one class Janis, which in charge of communication between
 * botpress and janis.
 *
 */

class Janis {
  constructor(bp, config) {
    if (!bp || !config) {
      throw new Error('You need to specify botpress and config')
    }

    this.setConfig(config)

    this.app = bp.getRouter('botpress-janis', {
      'bodyParser.json': false,
      'auth': req => !/\/webhook/i.test(req.originalUrl)
    })

    this.janis = require('janis')(config.apiKey, config.clientKey)
    this.janis.on('chat response', function (msg) {
      var platform = "facebook"
      var platformModule
      if (/[a-zA-Z]+/.test(msg.channel)) {
          platform = "slack"
          platformModule = bp.slack
      } else {
          platformModule = bp.messenger
      }
      var message = {}
      if (msg.attachments) {
          if (platformModule.createText) {
              message = platformModule.createAttachments(msg.channel, msg.attachments)
          }
      } 
      else if (platform == "facebook" && platformModule.createAttachment && msg.attachment) {
          if (msg.attachment.type == "template") {
              message = platformModule.createTemplate(msg.channel, msg.attachment.payload)
          } else if (msg.attachment.payload) {
              message = platformModule.createAttachment(msg.channel, msg.attachment.type, msg.attachment.payload.url)
          }
      }
      else if (msg.text.length > 0 && platformModule.createText) {
          message = platformModule.createText(msg.channel, msg.text)         
      }
      message.raw.slack_user = msg.slack_user
      message.raw.ts = msg.ts
      bp.events.emit('janis.chat_response', msg)
      bp.middlewares.sendOutgoing(message)
    })

  }

  setConfig(config) {
    this.config = config
  }

  getConfig() {
    return this.config
  }

  hopIn(platform, message, user) {
    this.janis.setPlatform(platform)
    if (user) {
        message.user_profile = user
    }
    return this.janis.hopIn(message)
  }

  hopOut(platform, message) {
    this.janis.setPlatform(platform)
    return this.janis.hopOut(message)
  }

  logUnkownIntent(platform, message) {
    this.janis.setPlatform(platform)
    return this.janis.logUnkownIntent(message)
  }

  assistanceRequested(platform, message) {
    this.janis.setPlatform(platform)
    return this.janis.assistanceRequested(message)
  }

  module(factory) {
    return factory.apply(this, [ this ])
  }
  
}

module.exports = Janis
