module.exports = function() {
  var state = null
  return {
    fetch: function(){
      return state
    },
    set: function(data) {
      state = data
    }
  }
}
