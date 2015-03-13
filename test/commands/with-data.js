var assert = require("assert")

describe("Commands", function() {
  describe("simple execute with data", function() {
    var app;
    beforeEach(function() {
      app = require("../../lib/index.js").createInstance()

      app.createCommand("say", {
        execute: function(data) {
          this.emit("said", data)
        }
      })
    })

    it("should emit event with data", function() {
      app.execute("say", { message: "Hello World" })

      var events = app.getEvents()
      assert.equal(events.length, 1)
      assert.equal(events[0].name, "said")
      assert.equal(events[0].data.message, "Hello World")
    })
  })
})
