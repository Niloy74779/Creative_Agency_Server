// Required Modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Mongodb Connection setup
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xga3p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

// MongoDB and server starts
client.connect((err) => {
  if (err) {
    console.log("Database error", err);
    return;
  }
  console.log("Database connected");
  const db = client.db(`${process.env.DB_NAME}`);

  const servicesCollection = db.collection("services");
  const adminCollection = db.collection("admin");
  const reviewCollection = db.collection("review");
  const orderCollection = db.collection("orders");

  require("./routes/serviceRoutes")(app, servicesCollection);
  require("./routes/adminRoutes")(app, adminCollection);
  require("./routes/reviewRoutes")(app, reviewCollection);
  require("./routes/orderRoutes.js")(app, orderCollection);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
