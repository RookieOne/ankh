var assert = require("assert")

describe("State", function() {
  describe("simple fetch", function() {
    var app;
    beforeEach(function() {
      app = require("../../lib/index.js").createInstance()

      app.createState("/message", {
        fetch: function() {
          return "Hello World"
        }
      })
    })

    it("should return state", function() {
      var message = app.state("/message").fetch()

      assert.equal(message, "Hello World")
    })
  })
})
