var assert = require("assert")

describe("Commands", function() {
  describe("fail can", function() {
    var app;
    beforeEach(function() {
      app = require("../../lib/index.js").createInstance()

      app.createCommand("say-hello-world", {
        can: function() {
          return false
        },
        execute: function() {
          this.emit("said-hello-world")
        }
      })
    })

    it("should not emit events and record error", function() {
      app.execute("say-hello-world")

      var events = app.getEvents()
      assert.equal(events.length, 0)

      var errors = app.getErrors()
      assert.equal(errors.length, 1)
      assert.equal(errors[0].message, "Failed requirements to execute 'say-hello-world'")
    })
  })
})
