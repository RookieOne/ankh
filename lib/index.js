var _ = require("underscore")
var emitter = require("./default-event-emitter.js")()

function Ankh() {
  var app = {}
  var commands = []
  var eventEmitter = emitter

  app.createCommand = function(name, command) {
    commands.push({
      name: name,
      command: command
    })
  }

  app.execute = function(commandName, data) {
    var commandEntry = _.findWhere(commands, { name: commandName })

    var commandContext = {
      emit: function(eventName, data) {
        eventEmitter.emit(eventName, data)
      }
    }
    var commandFx = commandEntry.command.execute
    _.bind(commandFx, commandContext, data)()
  }

  app.getEvents = function() {
    return eventEmitter.getEvents()
  }

  return app
}


var app = new Ankh()

module.exports = app
module.exports.createInstance = function() {
  return new Ankh()
}
