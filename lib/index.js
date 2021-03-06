var _ = require("underscore")
var clone = require("clone")

var createDefaultStateHandler = require('./default-state-handler')

function Ankh() {
  var app = {}
  var commands = []
  var states = []
  var eventEmitter = require("./default-event-emitter.js")()
  var logger = require("./default-logger.js")()
  var router = require('routes')()
  var eventHandlers = []

  app.createCommand = function(name, command) {
    commands.push({
      name: name,
      command: command
    })
  }

  app.execute = function(commandName, data) {
    var commandEntry = _.findWhere(commands, { name: commandName })

    var command = commandEntry.command

    if (command.can) {
      var canCheck = command.can(data)
      if (canCheck !== true) {
        logger.log("error", "Failed requirements to execute '" + commandName + "'", data)
        return
      }
    }

    var commandContext = {
      emit: function(eventName, data) {
        eventEmitter.emit(eventName, data)
      }
    }
    var commandFx = command.execute
    _.bind(commandFx, commandContext, data)()
  }

  app.createState = function(uri, stateHandlerConstructor) {
    var stateHandler
    if (stateHandlerConstructor === undefined) {
      stateHandler = createDefaultStateHandler()
    } else {
      stateHandler = stateHandlerConstructor()
    }

    var fetchToWrap = stateHandler.fetch
    stateHandler.fetch = function(data) {
      return clone(fetchToWrap(data))
    }

    states.push({
      uri: uri,
      stateHandler: stateHandler
    })
    router.addRoute(uri, function() {
      return stateHandler
    })
  }

  app.state = function(uri) {
    var match = router.match(uri)
    return match.fn()
  }

  app.getEvents = function() {
    return eventEmitter.getEvents()
  }

  app.getErrors = function() {
    return _.where(logger.getLog(), { type: "error" })
  }

  app.when = function(eventName, handler) {
    eventHandlers.push({
      eventName: eventName,
      handler: handler
    })
    var handle = _.bind(handler.handler, {
      state: app.state
    })
    eventEmitter.addHandler(eventName, handle)
  }

  app.turnOnTestMode = function() {
    app.emit = function(eventName, data) {
      eventEmitter.emit(eventName, data)
    }
  }

  return app
}


var app = new Ankh()

module.exports = app
module.exports.createInstance = function() {
  return new Ankh()
}
