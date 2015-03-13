var assert = require("assert")

describe("Commands", function() {
  describe("simple execute", function() {
    var app;
    beforeEach(function() {
      app = require("../../lib/index.js").createInstance()

      app.createCommand("say-hello-world", {
        execute: function() {
          this.emit("said-hello-world")
        }
      })
    })

    it("should emit event", function() {
      app.execute("say-hello-world")

      var events = app.getEvents()
      assert.equal(events.length, 1)
      assert.equal(events[0].name, "said-hello-world")
    })
  })
})
