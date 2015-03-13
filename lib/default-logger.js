module.exports = function() {
  var logger = {}
  var logEntries = []

  logger.log = function(entryType, message, data) {
    logEntries.push({
      type: entryType,
      message: message,
      data: data
    })
  }

  logger.getLog = function() {
    return logEntries
  }

  return logger
}
