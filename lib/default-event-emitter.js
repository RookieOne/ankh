module.exports = function() {
  var emitter = {}
  var eventLog = []

  emitter.emit = function(eventName, data) {
    eventLog.push({
      name: eventName,
      data: data
    })
  }

  emitter.getEvents = function() {
    return eventLog
  }

  return emitter
}
