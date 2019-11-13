const express = require("express");
const path = require("path");
const cors = require("cors");
const exphbs = require("express-handlebars");

const logger = require("./middleware/logger");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

//Init middleware
// app.use(logger);

//Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App"
  });
});

// Set Static Folder
// app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
// app.use("/api/members", require("./routes/api/members"));

// Scrap Teaser API Route
app.use("/api/teaser", require("./routes/api/teaser"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
