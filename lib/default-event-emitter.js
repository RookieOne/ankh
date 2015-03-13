var _ = require("underscore")

module.exports = function() {
  var emitter = {}
  var eventLog = []
  var handlers = []

  emitter.emit = function(eventName, data) {
    eventLog.push({
      name: eventName,
      data: data
    })

    var handlersToNotify = _.where(handlers, { eventName: eventName })
    handlersToNotify.forEach(function(handlerEntry) {
      handlerEntry.handler(data)
    })
  }

  emitter.addHandler = function(eventName, handler) {
    handlers.push({
      eventName: eventName,
      handler: handler
    })
  }

  emitter.getEvents = function() {
    return eventLog
  }

  return emitter
}
