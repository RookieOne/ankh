
// server
app.when("joined-draft-contest", {
  state: [
    ["contest", function(data) {
      return this.state("/draft/contests/" + data.contest_id);
    }],
    ["user", function(data) {
      return this.state("/users/" + data.user_id);
    }]
  ]
  handler: function(data) {
    var contest = this.state("/draft/contests/" + data.contest_id).get();
    var user = this.state("/users/" + data.user_id).get();

    contest.entries.push({
      user_id: user.id
    });
    contest.save();

    user.draft_contest_entries.push({
      contest_id: contest.id
    })
    user.save();
  }
});
