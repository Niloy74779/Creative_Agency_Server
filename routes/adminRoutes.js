module.exports = (app, adminCollection) => {
  // Add admin email address
  app.post("/makeadmin", (req, res) => {
    adminCollection
      .insertOne(req.body)
      .then((result) => {
        return res.send(result.insertedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  //Checks whether the loggedin user is admin
  app.post("/isAdminCheck", (req, res) => {
    adminCollection
      .findOne({ email: req.body.email })
      .then((result) => {
        if (result) {
          return res.send(true);
        }
        return res.send(false);
      })
      .catch((err) => console.log(err));
  });
};
