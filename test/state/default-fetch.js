var assert = require("assert")

describe("State", function() {
  describe("default fetch", function() {
    var app;
    beforeEach(function() {
      app = require("../../lib/index.js").createInstance()

      app.createState("/message")
    })

    it("should return default state", function() {
      var message = app.state("/message").fetch()

      assert.equal(message, null)
    })
  })
})
