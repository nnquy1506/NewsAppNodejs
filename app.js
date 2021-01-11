const express = require("express");
const bodyParser = require("body-parser");
const news = require("./routes/News_router");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");

const PORT = process.env.PORT || 1234;

// Configuring the database
const dbConfig = "mongodb://localhost:27017/News";
const mongoose = require("mongoose");

// Connecting to the database
mongoose.set("useCreateIndex", true);
mongoose
  .connect(dbConfig, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");

app.use("/api", news);
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`);
});
