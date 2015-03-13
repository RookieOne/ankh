var assert = require("assert")

describe("Events", function() {
  describe("simple event", function() {
    var app;
    beforeEach(function() {
      app = require("../../lib/index.js").createInstance()
    })

    it("should call handler", function(done) {
      app.when("said-hello-world", {
        handler: function() {
          done()
        }
      })

      app.turnOnTestMode()
      app.emit("said-hello-world")
    })
  })
})
