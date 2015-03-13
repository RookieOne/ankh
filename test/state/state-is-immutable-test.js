var assert = require("assert")

describe("State", function() {
  describe("state is immutable", function() {
    var app;
    beforeEach(function() {
      app = require("../../lib/index.js").createInstance()

      app.createState("/message", function() {
        var state = {
          message: "Hello World"
        }
        return {
          fetch: function() {
            return state
          }
        }
      })
    })

    it("should not change state", function() {
      var data = app.state("/message").fetch()
      data.message = "Howdy folks!"

      var messageState = app.state("/message").fetch()
      assert.equal(messageState.message, "Hello World")
    })
  })
})
