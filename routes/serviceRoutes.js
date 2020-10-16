const ObjectId = require("mongodb").ObjectID;

module.exports = (app, servicesCollection) => {
  //Adds new service
  app.post("/addservice", (req, res) => {
    const iconFile = req.files.icon;
    const title = req.body.title;
    const description = req.body.description;

    const iconImageFile = iconFile.data;
    const encodedIconImage = iconImageFile.toString("base64");

    const iconImage = {
      contentType: iconFile.mimeType,
      size: iconFile.size,
      img: Buffer.from(encodedIconImage, "base64"),
    };

    servicesCollection
      .insertOne({ title, description, iconImage })
      .then((result) => {
        return res.send(result.insertedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  // Gets all services
  app.get("/services", (req, res) => {
    servicesCollection
      .find({})
      .limit(6)
      .sort({ _id: -1 })
      .toArray((err, documents) => {
        if (!err) {
          return res.send(documents);
        }
      });
  });

  // Gets the individual service information
  app.get("/service/:id", (req, res) => {
    const id = req.params.id;

    servicesCollection
      .findOne({ _id: ObjectId(id) })
      .then((service) => {
        if (service) {
          return res.send(service);
        }
        return res.send(null);
      })
      .catch((err) => console.log(err));
  });
};
