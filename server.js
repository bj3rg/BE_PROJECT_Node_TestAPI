const express = require("express");
const morgan = require("morgan");
const postRoutes = require("./routes/main-route");
const sequelizeConnect = require("./database/connection");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/assets", express.static("public"));
app.use(morgan("dev"));
app.use("/api/v1", postRoutes);

sequelizeConnect
  .sync({
    // force: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started @ port ${port}`);
    });
  })
  .catch((err) => {
    console.err(err);
  });

const port = process.env.PORT || 3001;
