var assert = require("assert")

describe("Events", function() {
  describe("simple event that changes state", function() {
    var app;
    beforeEach(function() {
      app = require("../../lib/index.js").createInstance()

      app.createState("/message")
      app.when("said", {
        handler: function(data) {
          this.state("/message").set(data.message)
        }
      })
    })

    it("should change state", function() {
      app.turnOnTestMode()
      app.emit("said", { message: "Hello World" })

      var message = app.state("/message").fetch()
      assert.equal(message, "Hello World")
    })
  })
})
