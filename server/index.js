require("dotenv").config({ path: ".env" });
const port = parseInt(process.env.PORT) || 3004;
require("./connectivity/mongooseConnect");

const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

const upload = require("express-fileupload");
const routes = require("./routes");
const HOST = "0.0.0.0";

app.use(upload());

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use(
  cors({
    origin: ["http://localhost:3000/"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Header":
      "Origin, X-Requested-With, Content-Type, Accept",
    credentials: false,
  })
);

app.use("/api", routes);

app.get("/*", (req, res) => {
  res.json({ status: 200, response: "wrong Route" });
});

app.listen(port, HOST, (err) => {
  if (err) {
    return console.log({ Error: err.message || `server not started` });
  }
  console.log(`server started at http://localhost:${port}`);
});
