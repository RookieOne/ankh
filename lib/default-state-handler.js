module.exports = function() {
  var state = {}
  return {
    fetch: function(){
      return this.state
    },
    set: function(data) {
      this.state = data
    }
  }
}
