
// client
app.command("join-draft-contest", {
  dependencies: ["http", "currentUser"],
  can: function(contest) {
    return this.currentUser.balance > contest.entry_fee;
  },
  execute: function(contest) {
    http.POST("/draft/contests", {
      contest_id: contest.id
    })
    .then(function() {
      this.emit("joined-draft-contest", contest)
    }.bind(this))
    .catch(function(error) {
      this.emit("join-draft-contest-error", error.message)
    }.bind(this))
  }
});

// server
app.command("join-draft-contest", {
  dependencies: ["currentUser"],
  route: function() {
    return {
      url: "/api/draft/contests",
      method: "POST"
    }
  },
  can: function(data) {
    var contest = this.state.get("/draft/contests/" + data.contest_id);
    return this.currentUser.balance > contest.entry_fee;
  }
  execute: function(data) {
    this.execute("charge-entry-fee", {
      user_id: this.currentUser.id,
      contest_id: data.contest_id
    });

    this.emit("joined-draft-contest", {
      user_id: this.currentUser.id,
      contest_id: data.contest_id
    });
  }
});
