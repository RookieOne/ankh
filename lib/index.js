var _ = require("underscore")

function Ankh() {
  var app = {}
  var commands = []
  var eventEmitter = require("./default-event-emitter.js")()
  var logger = require("./default-logger.js")()

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
        logger.log("error", "Failed requirements to execute '" + commandName + "'")
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

  app.getEvents = function() {
    return eventEmitter.getEvents()
  }

  app.getErrors = function() {
    return _.where(logger.getLog(), { type: "error" })
  }

  return app
}


var app = new Ankh()

module.exports = app
module.exports.createInstance = function() {
  return new Ankh()
}
