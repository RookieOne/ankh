
// server
app.createState("/contests/:id", function() {
  var contest = {}
  return {
    fetch: function(data) {
      contest = Contest.find(data.id)
      return contest
    },
    save: function() {
      contest.save
    }
  }
})
