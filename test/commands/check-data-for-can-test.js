var assert = require("assert")

describe("Commands", function() {
  describe("check data for can", function() {
    var app;
    beforeEach(function() {
      app = require("../../lib/index.js").createInstance()

      app.createCommand("say", {
        can: function(data) {
          return data.message === "Hello World"
        },
        execute: function(data) {
          this.emit("said", data)
        }
      })
    })

    it("should emit event", function() {
      app.execute("say", { message: "Hello World" })

      var events = app.getEvents()
      assert.equal(events.length, 1)
      assert.equal(events[0].name, "said")
      assert.equal(events[0].data.message, "Hello World")
    })

    it("should not emit events and record error", function() {
      app.execute("say", { message: "Howdy fellas!"})

      var events = app.getEvents()
      assert.equal(events.length, 0)

      var errors = app.getErrors()
      assert.equal(errors.length, 1)
      assert.equal(errors[0].message, "Failed requirements to execute 'say'")
      assert.equal(errors[0].data.message, "Howdy fellas!")
    })
  })
})
