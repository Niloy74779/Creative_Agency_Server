module.exports = (app, reviewCollection) => {
  // Adds review
  app.post("/addreview", (req, res) => {
    reviewCollection
      .insertOne(req.body)
      .then((result) => res.send(result.insertedCount > 0))
      .catch((err) => console.log(err));
  });

  //Fetches all reviews
  app.get("/allreviews", (req, res) => {
    reviewCollection
      .find({})
      .limit(6)
      .sort({ _id: -1 })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });
};
